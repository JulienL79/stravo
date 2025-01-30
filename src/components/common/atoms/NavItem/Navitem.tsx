import React from "react";
import { Link } from "react-router-dom";
import { INavItemProps } from "./NavItem.props";
import "./NavItem.css"

export const NavItem : React.FC<INavItemProps> = ({
    to,
    content,
    className = "",
    name = ""
}) => {
    return (
        <Link to={to} className={`nav-item ${className}`}>
            {content}
            {name ? <p className="link-name">{name}</p>: <></>}
        </Link>
    )
}