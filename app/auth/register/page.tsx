"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import "@/css/app/auth/register.css"
import { FaEnvelope, FaUser, FaLock, FaShieldAlt } from "react-icons/fa"

import AgeInput from "@/components/auth/register/AgeInput"

const Register = () => {

    const router = useRouter()

    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        age: "",
        bio: "",
        posts: []
    })

    const [error, setError] = useState("")
    const [ageError, setAgeError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [emailError, setEmailError] = useState("")

    const [showEmailAuthButton, setShowEmailAuthButton] = useState(false)
    const [showVerificationInput, setShowVerificationInput] = useState(false)
    
    const [verificationCode, setVerificationCode] = useState("")

    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    const emailRegex = /^[^\s@]+@[^\s@]+[^\s@]+$/

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value
        setForm({ ...form, email: value })

        if(!value) {
            
            setEmailError("")
            setShowEmailAuthButton(false)
            return
        }

        if(!emailRegex.test(value)) {

            setEmailError("올바른 이메일 형식이 아닙니다.")
            setShowEmailAuthButton(false)
        }else {
            setEmailError("")
            setShowEmailAuthButton(true)
        }
    }

    const handleEmailAuthClick = () => {
        // TODO 이메일 인증 로직
        
        setShowVerificationInput(true)
    }

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value)
    }

    const handleVerifyCode = () => {
        // TODO 실제 인증번호 검증 로직 생략 (백엔드 통신 필요)

        alert(`입력한 인증 코드: ${verificationCode}`)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleAgeChange = (value: string) => {
       
        setForm({ ...form, age: value })
    }

    const handleAgeBlur = () => {

        if(form.age.length === 8) {

            const year = form.age.slice(0, 4)
            const month = form.age.slice(4, 6)
            const day = form.age.slice(6, 8)

            setForm({ ...form, age: `${year}.${month}.${day}` })
            setAgeError("")
        }else if(form.age.length !== 0) {
            setAgeError(`유효하지 않은 생년월일입니다.`)
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value
        setForm({ ...form, password: value })

        if(value.length === 0) {
            setPasswordError("")
            return
        }

        if(!passwordRegex.test(value)) {
            setPasswordError("비밀번호는 8~16자, 영소문자/숫자/특수문자를 모두 포함해야 합니다.")
        }else {
            setPasswordError("")
        }

        if(form.confirmPassword && form.confirmPassword !== value) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.")
        }else {
            setConfirmPasswordError("")
        }
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value
        setForm({ ...form, confirmPassword: value })

        if(value !== form.password) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.")
        }else {
            setConfirmPasswordError("")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setAgeError("")

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
                            name="이름" 
                            value={form.name} 
                            onChange={handleChange} 
                            required/>
                    </div>

                    <div className="input-group">
                        <FaEnvelope className="input-icon"/>
                        <input 
                            type="이메일" 
                            className="register-input"
                            placeholder="E-mail"
                            name="email" 
                            value={form.email} 
                            onChange={handleEmailChange} 
                            required/>
                    </div>
                    {emailError && <p className="error-message">{emailError}</p>}
                    <button
                        type="button"
                        className="email-auth-button"
                        onClick={handleEmailAuthClick}
                    >이메일 인증</button>

                    {showVerificationInput && (
                        <div className="verification-group input-group">
                            <FaShieldAlt className="input-icon"/>
                            <input 
                                type="text"
                                className="register-input verification-input"
                                placeholder="인증 코드"
                                value={verificationCode}
                                onChange={handleVerificationCodeChange}
                            />
                            <button
                                type="button"
                                className="verification-button"
                                onClick={handleVerifyCode}
                            >인증 확인</button>
                        </div>
                    )}

                    <div className="input-group">
                        <FaLock className="input-icon"/>
                        <input 
                            type="password" 
                            className="register-input"
                            placeholder="비밀번호"
                            name="password" 
                            value={form.password}
                            onChange={handlePasswordChange} 
                            required/>
                    </div>
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <div className="input-group">
                        <FaLock className="input-icon"/>
                        <input 
                            type="password" 
                            className="register-input"
                            placeholder="비밀번호 확인"
                            name="confirmPassword" 
                            value={form.confirmPassword}
                            onChange={handleConfirmPasswordChange} 
                            required/>
                    </div>
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

                    <div className="input-group">
                        <AgeInput 
                            value={form.age}
                            onChange={handleAgeChange}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

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