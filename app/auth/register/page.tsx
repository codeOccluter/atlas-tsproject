"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const Register = () => {

    const router = useRouter()

    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        age: 0,
        bio: "",
        posts: []
    })

    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if(form.password !== form.confirmPassword) {
            
            setError(`비밀번호가 일치하지 않습니다.`)
            return
        }

        try {

            const result = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await result.json()

            if(!result.ok) throw new Error(data.message)

            alert("회원가입이 완료 되었습니다.")
            router.push("/auth/login")
        }catch(err: any){
            setError(err.message)
        }
    }

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>회원가입</h2>
                {error && <p className="error">{error}</p>}
                <input 
                    type="text" 
                    name="name" 
                    placeholder="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    required/>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required/>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="PW" 
                    value={form.password}
                    onChange={handleChange} 
                    required/>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="PW Confirm" 
                    value={form.confirmPassword}
                    onChange={handleChange} 
                    required/>
                <input 
                    type="number"
                    name="age"
                    placeholder="age"
                    value={form.age}
                    onChange={handleChange} 
                    required/>
                <button type="submit">가입하기</button>
            </form>
        </div>
    )
}

export default Register