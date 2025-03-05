import { transporter } from "@/utils/auth/register/mailer"
import { randomVerificationCode } from "@/utils/auth/register/randomGenerator"
import EmailVerifyCode from "@/models/EmailVerifyCode/EmailVerifyCode"

enum VerifyController {
    SEND_MAIL = 1,
    NO_EMAIL = 5,
    EXIST_EMAIL= 6,
}

export async function checkEmailAndSendCode(email: string): 
    Promise<{ message: string, code: string, result: number }> {

    const existEmail = await EmailVerifyCode.find({ email })

    if(existEmail) {
        return { message: `존재하지 않는 이메일입니다.`, code: "0", result: VerifyController.NO_EMAIL }
    }

    if(!email) {
        return { message: `존재하지 않는 이메일입니다.`, code: "0", result: VerifyController.NO_EMAIL }
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

    return { message: `인증 코드가 전송되었습니다.`, code, result: VerifyController.SEND_MAIL }
}

export async function verifyEmailCode(email: string, inputCode: string) {

    const doc = await EmailVerifyCode.findOne({
        email,
        isUsed: false
    }).sort({ createdAt: -1 }) // 가장 최근 생성된 코드

    if(!doc) {
        return { success: false, message: `인증 코드가 발급되지 않았거나 만료되었습니다.` }
    }

    if(doc.expiresAt.getTime() < Date.now()) {
        return { success: false, message: `인증 코드가 만료되었습니다.` }
    }

    if(doc.code !== inputCode) {
        return { success: false, message: "인증 코드가 일치하지 않습니다." }
    }

    doc.isUsed = true
    await doc.save()

    return { success: true, message: `이메일 인증이 완료되었습니다.` }
}