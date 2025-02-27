"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import "@/css/app/auth/register.css"
import { FaEnvelope, FaUser, FaLock, FaCalendarAlt } from "react-icons/fa"
import CustomCalendar from "@/components/auth/register/CustomCalendar"

const Register = () => {

    const router = useRouter()

    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        age: new Date(2003, 0, 1),
        bio: "",
        posts: []
    })

    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleDateChange = (date: Date) => {
        setForm({ ...form, age: date })
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
            <div className="register-box">
                <h2 className="register-title">회원가입</h2>
                <p className="register-subtitle">서비스를 이용하려면 회원가입을 진행하세요.</p>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser className="input-icon"/>
                        <input 
                            type="text" 
                            className="register-input"
                            placeholder="Name"
                            name="name" 
                            value={form.name} 
                            onChange={handleChange} 
                            required/>
                    </div>
                    <div className="input-group">
                        <FaEnvelope className="input-icon"/>
                        <input 
                            type="email" 
                            className="register-input"
                            placeholder="E-mail"
                            name="email" 
                            value={form.email} 
                            onChange={handleChange} 
                            required/>
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon"/>
                        <input 
                            type="password" 
                            className="register-input"
                            placeholder="PW"
                            name="password" 
                            value={form.password}
                            onChange={handleChange} 
                            required/>
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon"/>
                        <input 
                            type="password" 
                            className="register-input"
                            placeholder="PW Confirm"
                            name="confirmPassword" 
                            value={form.confirmPassword}
                            onChange={handleChange} 
                            required/>
                    </div>
                    <div className="input-group">
                        <FaCalendarAlt className="input-icon"/>
                        <span className="birth-text">Birth</span>
                        <CustomCalendar 
                            selectedDate={form.age}
                            onChange={handleDateChange}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="register-button"
                    >가입하기</button>
                </form>

                <p className="register-login-text"
                >이미 계정이 있으신가요? <Link href="/auth/login" className="register-login-link">로그인</Link></p>
            </div>
        </div>
    )
}

export default Register