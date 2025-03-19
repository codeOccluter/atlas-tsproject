import { VerifyController } from "@/controllers/auth/register/email/VerifyController";
import dbConnect from "@/lib/db/dbConnect"
import { NextResponse } from "next/server";

export async function GET() {

}

export async function POST(request: Request) {
    await dbConnect()

    const { email } = await request.json()
    const { message, code, result } = await VerifyController.checkEmailAndSendCode(email)

    console.log(`message: ${message}, code: ${code}, result: ${result}`)

    if(result !== 1) {

        return NextResponse.json({ message: `테스트용 메시지` }, { status: 200 })
    }

    return NextResponse.json(message, { status: 201 })
}