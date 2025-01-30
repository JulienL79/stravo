import { IButtonProps } from "./Button.props";
import React from "react";
import "./Button.css"

export const Button : React.FC<IButtonProps> = ({className = "", content, onClick = null}) => {

    if(onClick === null) {
        return (
            <button className={className} type="submit">{content}</button>
        )
    }

    return (
        <button className={className} onClick={() => onClick()}>{content}</button>
    )
}