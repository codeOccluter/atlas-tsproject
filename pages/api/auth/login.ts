import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { setCookie } from 'cookies-next'
import dbConnect from "@/lib/db/dbConnect"
import User from "@/models/user/User"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    await dbConnect()

    const { email, password } = req.body
    console.log(`email: ${email}`)
    console.log(`password: ${password}`)

    const user = await User.findOne({ email })

    console.log(user)

    if(!user) {
        return res.status(401).json({ message: "Not found email" })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    console.log(`password: ${password}`)
    console.log(`user.password: ${user.password}`)
    console.log(`isMatch: ${isMatch}`)

    if(!isMatch) {
        console.log(`if in isMatch: ${isMatch}`)
        return res.status(401).json({ message: `Invalid PW credentials` })
    }
    const token = jwt.sign({ id: user._id, email: user.email }, 
                            process.env.JWT_SECRET as string,
                            { expiresIn: '1d' })
                            
    setCookie(`auth_token`, token, { req, res, httpOnly: true, secure: process.env.NODE_ENV === 'development' })

    return res.status(200).json({ message: `Logged in succesfully` })
}