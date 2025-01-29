import React from "react";
import { INavbarProps } from "./Navbar.props";
import { NavItem } from "@common-atoms/NavItem";
import { Image } from "@common-atoms/Image";
import "./Navbar.css"

export const Navbar : React.FC<INavbarProps> = ({ 
    navLinks,
    className = ""
}) => {

    if(className="header") {
        return (
            <header>
                <div className="navbar">
                    <NavItem to="/" content={<Image className="logo" src="./logo.png" alt="Logo Stravo"/>} />
                    <div className="nav-links">
                        {navLinks.map((link) => {
                            return <NavItem key={link.to} to={link.to} className={link.className ? link.className : ""} content={link.content}/>
                        })}
                    </div>
                </div>
            </header>
        )
    }

    if(className="footer") {
        return (
            <footer>
                <div className="navbar">
                    <div className="nav-links">
                        {navLinks.map((link) => {
                            return <NavItem key={link.to} to={link.to} className={link.className ? link.className : ""} content={link.content}/>
                        })}
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <div className="navbar">
            <div className="nav-links">
                {navLinks.map((link) => {
                    return <NavItem key={link.to} to={link.to} className={link.className ? link.className : ""} content={link.content}/>
                })}
            </div>
        </div>
    )
}