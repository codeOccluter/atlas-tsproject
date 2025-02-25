import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

const dbConnect = async () => {
    
    if(!MONGODB_URI) throw new Error(`MONGODB_URI 환경 변수가 설정되지 않았습니다.`)

    if(mongoose.connection.readyState >= 1) return

    await mongoose.connect(MONGODB_URI, {
        dbName: `kihunism`,
    })
    console.log(`✅ MongoDB Connected!`)
}

export default dbConnect