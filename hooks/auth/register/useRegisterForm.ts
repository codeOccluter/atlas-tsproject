import { useState } from "react"
import { useRouter } from "next/navigation"

interface UseRegisterFormProps {

}

export function useRegisterForm({}: UseRegisterFormProps = {}) {

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

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

    const handleAgeChange = (value: string) => {
       
        setForm({ ...form, age: value })
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

    // 최종 폼(form) 제출 함수
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
    
    return {
        // 상태
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
    }
}