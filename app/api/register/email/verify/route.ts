import type { NextApiRequest, NextApiResponse } from "next";
import { checkEmailAndSendCode } from "@/controllers/auth/register/email/VerifyController";
import dbConnect from "@/lib/db/dbConnect"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await dbConnect()

    if(req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    const { email } = req.body
    const { message, code, result } = await checkEmailAndSendCode(email)

    
}