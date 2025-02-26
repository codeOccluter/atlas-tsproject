import { NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(req: NextRequest) {

    const token = req.cookies.get(process.env.COOKIE_NAME || `auth_token`)?.value

    if(req.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    if(!token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    try {

        const secret = process.env.JWT_SECRET as string
        jwt.verify(token, secret)

        return NextResponse.next()
    }catch(err){

        console.error(`Invalid token: ${err}`)
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

// 미들웨어 적용할 경로 설정
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/posts/:path*', "/"]
}