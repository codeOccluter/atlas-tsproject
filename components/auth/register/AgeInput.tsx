"use client"

import React, { useState } from "react"
import { FaCalendarAlt } from "react-icons/fa"
import { IMaskInput } from "react-imask"
import "@/css/components/auth/register/AgeInput.css"

interface AgeInputProps {
    value: string
    onChange: (value: string) => void
}

const AgeInput: React.FC<AgeInputProps> = ({ value, onChange }) => {

    const [error, setError] = useState("")

    const handleAccept = (maskedValue: string) => {
        
        onChange(maskedValue)

        if(maskedValue.length === 10) {
            setError("")
        }else if(maskedValue.length === 0) {
            setError("")
        }else{
            setError("유효하지 않은 생년월일입니다.")
        }
    } 

    return (
        <div>
            <div className="input-group">
                <FaCalendarAlt className="input-icon"/>
                <IMaskInput
                    mask="0000.00.00"
                    lazy={true}
                    placeholder="YYYY.MM.DD"
                    value={value}
                    onAccept={handleAccept}
                    className="register-input"
                />
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default AgeInput