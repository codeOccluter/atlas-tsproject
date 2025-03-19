import { VerifyTypes } from "./VerifyTypes"

export const VerifyHelpers = {
    makeEmailVerifyResult(message: string, code: string, result: number): VerifyTypes {
        return { message, code, result }
    },

    sendEmailCode(message: string, success: boolean, result: number) {
        return { message, success, result }
    }
}