import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/db/dbConnect"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await dbConnect()
    res.status(200).json({ message: `✅ MongoDB Connected` })
}