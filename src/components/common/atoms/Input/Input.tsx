import { IInputProps } from "./Input.props";
import React from "react";
import "./Input.css"

export const Input: React.FC<IInputProps> = ({
    type,
    placeholder,
    className = "",
    value = ""
}) => {
    return (
        <input type={type} placeholder={placeholder} className={className} value={value}/>
    )
};