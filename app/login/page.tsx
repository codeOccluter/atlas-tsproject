"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "@/css/login/page.css"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const result = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if(result.ok) {
            router.push('/dashboard')
        }else {
            // TODO
            // 로그인 실패 시 실행되는 코드
            console.log(`result: ${result.ok}`)
            alert('로그인 실패')
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                {/* <h2 className="login-title">로그인</h2> */}
                <form onSubmit={handleLogin} className="login-form">
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        required
                    />
                    <input 
                        type="password"
                        placeholder="PW"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        required
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="login-links">
                    <button className="link-btn">회원가입</button>
                    <button className="link-btn">ID / PW 찾기</button>
                </div>
                <div className="social-login">
                    <button className="social-btn google">Google 로그인</button>
                    <button className="social-btn naver">Naver 로그인</button>
                    <button className="social-btn kakao">Kakao 로그인</button>
                </div>
            </div>
        </div>
    )

}