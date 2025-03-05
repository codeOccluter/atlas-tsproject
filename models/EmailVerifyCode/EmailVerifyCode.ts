import mongoose, { Schema, Document } from "mongoose"

export interface IEmailVerifyCode extends Document {
    email: string
    code: string
    createdAt: Date
    expiresAt: Date
    isUsed: boolean
}

const EmailVerifyCodeSchema = new Schema<IEmailVerifyCode>({
    email: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false }
})

export default 
    mongoose.models.EmailVerifyCode ||
    mongoose.model<IEmailVerifyCode>("EmailVerifyCode", EmailVerifyCodeSchema)