"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "@/css/components/auth/register/custom-calendar.css"


interface CustomCalendarProps {
    selectedDate: Date
    onChange: (date: Date) => void
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDate, onChange }) => {

    const [date, setDate] = useState(selectedDate || new Date(2003, 0, 1))

    const handleChange = (newDate: Date) => {

        setDate(newDate)
        onChange(newDate)
    }

    return (
        <div className="date-container">
            <DatePicker 
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="YYYY-MM-DD"
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date()}
                className="custom-datepicker"
            />
        </div>
    )
}

export default CustomCalendar