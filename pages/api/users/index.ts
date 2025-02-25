import type { NextApiRequest, NextApiResponse } from "next"
import User from "@/models/user/User"
import { apiHandler } from "@/lib/api/apiHandler"

export default apiHandler(async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === "GET") {

        // const users = await User.find().populate('posts') 
        // 아직 posts 모델이 정의가 되지 않아서 오류 발생 (조인 불가)
        const users = await User.find()
        return res.status(200).json(users)
    }

    if(req.method === "POST") {

        const { name, email, password, age, bio } = req.body
        const newUser = await User.create({ name, email, password, age, bio })
        
        return res.status(201).json(newUser)
    }

    res.status(405).json({ error: `허용되지 않은 메서드 ${req.method}` })
})