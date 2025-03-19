import { transporter } from "@/utils/auth/register/mailer"
import { randomVerificationCode } from "@/utils/auth/register/randomGenerator"
import EmailVerifyCode from "@/models/EmailVerifyCode/EmailVerifyCode"
import { VerifyTypes } from "./VerifyTypes"
import { VerifyHelpers } from "./VerifyHelpers"

enum VerifyResultCode {
    SUCCESS_CODE = 1,
    EMAIL_NOT_FOUND = 2,
    EMAIL_ALREADY_REGISTERED = 3,
    CODE_NOT_FOUND_OR_EXPIRED = 4,
    CODE_EXPIRED = 5,
    CODE_NOT_VALID = 6
}

export const VerifyController = {
    async checkEmailAndSendCode(email: string): Promise<VerifyTypes> {
        if(!email) {
            return VerifyHelpers.makeEmailVerifyResult(`존재하지 않는 이메일 입니다.`, `0`, VerifyResultCode.EMAIL_NOT_FOUND)
        }
    
        const existEmail = await EmailVerifyCode.findOne({ email })
        if(existEmail) {
            return VerifyHelpers.makeEmailVerifyResult(`이미 등록된 이메일입니다.`, `0`, VerifyResultCode.EMAIL_ALREADY_REGISTERED)
        }
    
        const code = randomVerificationCode(6)
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000) // 유효시간: 3분
    
        await EmailVerifyCode.create({
            email,
            code,
            createdAt: new Date(),
            expiresAt,
            isUsed: false
        })
    
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "KIHUNSIM 서비스 회원가입 인증 코드입니다.",
            text: `인증 코드는 ${code} 입니다.`
            // TODO: text 대신 html 형식으로 작성
        }
        await transporter.sendMail(mailOptions)
    
        return VerifyHelpers.makeEmailVerifyResult(`인증코드가 전송되었습니다.`, code, VerifyResultCode.SUCCESS_CODE)
    },

    async verifyEmailCode(email: string, inputCode: string) {

        const emailCodeDoc = await EmailVerifyCode.findOne({
            email,
            isUsed: false
        }).sort({ createdAt: -1 }) // 가장 최근 생성된 코드
    
        if(!emailCodeDoc) {
            return VerifyHelpers.sendEmailCode(`인증 코드가 발급되지 않았거나 만료되었습니다.`, false, VerifyResultCode.CODE_NOT_FOUND_OR_EXPIRED)
        }
    
        if(emailCodeDoc.expiresAt.getTime() < Date.now()) {
            return VerifyHelpers.sendEmailCode(`인증 코드가 만료되었습니다.`, false, VerifyResultCode.CODE_EXPIRED)
        }
    
        if(emailCodeDoc.code !== inputCode) {
            return VerifyHelpers.sendEmailCode(`인증 코드가 일치하지 않습니다.`, false, VerifyResultCode.CODE_NOT_VALID)
        }
    
        emailCodeDoc.isUsed = true
        await emailCodeDoc.save()
    
        return VerifyHelpers.sendEmailCode(`인증 완료되었습니다.`, true, VerifyResultCode.SUCCESS_CODE)
    }
}