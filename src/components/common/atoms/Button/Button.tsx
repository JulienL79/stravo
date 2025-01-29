import { IButtonProps } from "./Button.props";
import React from "react";
import "./Button.css"

export const Button : React.FC<IButtonProps> = ({className, content, onClick}) => {
    return (
        <button className={className} onClick={() => onClick()}>{content}</button>
    )
}