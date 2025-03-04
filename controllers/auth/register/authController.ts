import { NextApiRequest, NextApiResponse } from "next"
import { transporter } from "@/utils/auth/register/mailer"
import { randomVerificationCode } from "@/utils/auth/register/randomGenerator"

let tmpVerificationCode: { [email: string]: string } = {

}

export async function sendVerificationEmail(req: NextApiRequest, res: NextApiResponse) {

    try{

        const { email } = req.body
        if(!email) {
            return res.status(400).json({ message: `이메일이 없습니다.` })
        }

        const code = randomVerificationCode(6)

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "KIHUNSIM 서비스 회원가입 인증 코드입니다.",
            text: `인증 코드는 ${code} 입니다.`
            // TODO: text 대신 html 형식으로도 보내기
        }

        await transporter.sendMail(mailOptions)

        tmpVerificationCode[email] = code

        return res.json({ message: `인증 코드가 전송되었습니다.` })
    }catch(err) {
        console.error(err)
        
        return res.status(500).json({ message: `이메일 전송 오류` })
    }
}

export async function verifyEmailCode(req: NextApiRequest, res: NextApiResponse) {

    try{

        const { email, code } = req.body
        if(!email || !code) {
            return res.status(400).json({ message: `이메일 또는 코드가 누락되었습니다.` })
        }

        const storedCode = tmpVerificationCode[email]
        if(!storedCode) {
            return res.status(400).json({ message: `인증 코드가 발급되지 않은 이메일입니다.` })
        }

        if(storedCode !== code) {
            return res.status(400).json({ message: `인증 코드가 일치하지 않습니다.` })
        }

        delete tmpVerificationCode[email]

        return res.json({ message: `이메일 인증이 완료되었습니다.` })
    }catch(err) {
        console.error(err)

        return res.status(500).json({ message: `인증확인 오류` })
    }
}