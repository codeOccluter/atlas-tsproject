import type { NextApiRequest, NextApiResponse } from "next"
import User from "@/models/user/User"
import { apiHandler } from "@/lib/api/apiHandler"
import dbConnect from "@/lib/db/dbConnect"
import { NextResponse } from "next/server"

export async function GET() {
    await dbConnect()
        
    const users = await User.find()
    
    return NextResponse.json(users, { status: 200 })

}

export async function POST(request: Request) {
    await dbConnect()

    const { name, email, password, age, bio } = await request.json()
    const newUser = await User.create({ name, email, password, age, bio })

    return NextResponse.json(newUser, { status: 201 })
}