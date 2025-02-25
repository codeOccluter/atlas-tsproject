import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../db/dbConnect"

type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => Promise<void | NextApiResponse<any>>

export const apiHandler = (handler: HandlerFunction) => async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        
        await dbConnect()
        await handler(req, res)
    } catch(error) {
        
        console.error(`API Error:`, error)
        res.status(500).json({ error: `서버 내부 오류 발생 in apiHandler` })
    }
}