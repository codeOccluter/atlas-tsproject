import { VerifyTypes } from "./VerifyTypes"

export function makeVerifyResult ( message: string, code: string, result: number ): VerifyTypes {
    return { message, code, result }
}