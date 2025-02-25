import mongoose, { Schema, Document, Types } from "mongoose"

export interface IPost extends Document {

    title: string,
    content: string,
    author: Types.ObjectId, // User와 연결
    tags: string,
    likes: number
    createdAt: Date,
    updatedAt: Date
}

const PostSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: `User`, required: true }, // User 모델과 연결
        tags: [{ type: String }], // 태그 추가 가능
        likes: { type: Number, default: 0 } // 좋아요 기능 추가
    },
    { timestamps: true }
)

export default mongoose.models.Post || mongoose.model<IPost>(`Post`, PostSchema)