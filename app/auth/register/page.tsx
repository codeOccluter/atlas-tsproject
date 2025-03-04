"use client"

import Link from "next/link"
import "@/css/app/auth/register.css"
import { FaEnvelope, FaUser, FaLock, FaShieldAlt } from "react-icons/fa"
import AgeInput from "@/components/auth/register/AgeInput"
import { useRegisterForm } from "@/hooks/auth/register/useRegisterForm"

const Register = () => {

    const {
        //상태
        form,
        error,
        ageError,
        passwordError,
        confirmPasswordError,
        emailError,
        showEmailAuthButton,
        showVerificationInput,
        verificationCode,

        // 핸들러
        handleChange,
        handleEmailChange,
        handleEmailAuthClick,
        handleVerificationCodeChange,
        handleVerifyCode,
        handleAgeChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleSubmit
    } = useRegisterForm()

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

                    <div>
                        <AgeInput 
                            value={form.age}
                            onChange={handleAgeChange}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button 
                        type="submit"
                        className="register-button"
                        // TODO onClick 시 서버 전송 및 라우팅
                    >가입하기</button>
                </form>

                <p className="register-login-text"
                >이미 계정이 있으신가요? <Link href="/auth/login" className="register-login-link">로그인</Link></p>
            </div>
        </div>
    )
}

export default Register