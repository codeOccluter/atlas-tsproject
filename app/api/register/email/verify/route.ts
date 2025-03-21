import { VerifyController } from "@/controllers/auth/register/email/VerifyController";
import dbConnect from "@/lib/db/dbConnect"
import { formatResponse, ResponseStatusText, ResponseStatusCode } from "@/lib/utils/formatResponse";

export async function GET() {
    
}

export async function POST(request: Request) {
    await dbConnect()

    const { email } = await request.json()
    const { message, code, result } = await VerifyController.checkEmailAndSendCode(email)

    console.log(`message: ${message}, code: ${code}, result: ${result}`)

    if(result !== 1) {

        return formatResponse.responseBadRequest(
            { message: "Response 테스트", code, result },
            { status: ResponseStatusCode.SUCCESS_OK, statusText: ResponseStatusText.BAD_REQUEST }
        )
    }

    return formatResponse.responseCreated(
        { msesage: `Response Created` },
        { status: ResponseStatusCode.CREATED, statusText: ResponseStatusText.CREATED }
    )
}