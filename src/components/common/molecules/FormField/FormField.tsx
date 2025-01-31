import { IFormFieldProps } from "./FormField.props"
import React from "react"
import "./FormField.css"
import { Label } from "@common-atoms/Label"
import { Input } from "@common-atoms/Input"

export const FormField:React.FC<IFormFieldProps> = ({
    label,
    id,
    type,
    placeholder,
    onChange,
    value = "",
    className = "",
    required = false,
    min,
    step
}) => {

    if(className === "other") {
        return (<></>)
    }

    return (
        <div className="form-field">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                required={required}
                min={min}
                step={step}
            />
        </div>
    )
}