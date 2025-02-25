import { NextApiRequest, NextApiHandler, NextApiResponse } from "next"
import { apiHandler } from "@/lib/api/apiHandler"
import Post from "@/models/post/Post"
import User from "@/models/user/User"

export default apiHandler(async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === "GET") {

        const posts = await Post.find().populate("author", "name email")
        return res.status(200).json(posts)
    }

    if(req.method === "POST") {

        const { title, content, authorId, tags } = req.body

        if(!authorId) {
            return res.status(400).json({ error: `Author ID is required` })
        }

        const existingUser = await User.findById(authorId)
        if(!existingUser) {
            return res.status(404).json({ error: `User not found` })
        }

        // Post 생성
        const newPost = new Post({ title, content, author: authorId, tags })
        await newPost.save()

        return res.status(201).json(newPost)
    }
})