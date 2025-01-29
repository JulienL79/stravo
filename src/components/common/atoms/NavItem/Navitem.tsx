import React from "react";
import { Link } from "react-router-dom";
import { INavItemProps } from "./NavItem.props";
import "./NavItem.css"

export const NavItem : React.FC<INavItemProps> = ({
    to,
    content,
    className = ""
}) => {
    return (
        <Link to={to} className={className}>
            {content}
        </Link>
    )
}