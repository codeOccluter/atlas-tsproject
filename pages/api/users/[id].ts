import { NextApiRequest, NextApiResponse } from 'next'
import { apiHandler } from '@/lib/api/apiHandler'
import { fetchById } from '@/lib/db/fetchById'
import User from '@/models/user/User'

export default apiHandler(async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query
    const user = await fetchById(User, id as string, ['posts'])

    if(!user) return res.status(404).json({ error: `유저를 찾을 수 없음` })

    if(req.method === `GET`) return res.status(200).json(user)
    if(req.method === `PUT`) {
        
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(updatedUser)
    }

    if(req.method === `DELETE`) {

        await User.findByIdAndDelete(id)
        return res.status(204).end()
    }

    res.status(405).json({ error: `허용되지 않은 메서드` })
})