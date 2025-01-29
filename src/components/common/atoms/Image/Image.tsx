import React from "react";
import { IImageProps } from "./Image.props";
import './Image.css'

export const Image : React.FC<IImageProps> = ({className = "", src, alt}) => {

    return (
        <img className={className} src={src} alt={alt}/>
    )
}