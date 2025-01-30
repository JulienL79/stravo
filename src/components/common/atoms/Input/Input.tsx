import { IInputProps } from "./Input.props";
import React from "react";
import "./Input.css"

export const Input: React.FC<IInputProps> = ({
    id,
    type,
    placeholder,
    className = "",
    value = "",
    required = false,
    onChange
}) => {
    return (
        <input id={id} type={type} placeholder={placeholder} className={className} value={value} required={required} onChange={onChange}/>
    )
};