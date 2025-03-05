import mongoose, { Schema, Document, Types } from "mongoose"

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    age?: number,
    bio?: string,
    posts: Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        age: { type: Number, required: true },
        bio: { type: String },
        posts: [{ type: Schema.Types.ObjectId, ref: `Post` }],
    },
    { timestamps: true }
)

// posts: ObjectId[] → User가 작성한 Post를 저장할 배열
// timestamps: true → createdAt, updatedAt 자동 관리

export default 
    mongoose.models.User ||
    mongoose.model<IUser>("User", UserSchema)