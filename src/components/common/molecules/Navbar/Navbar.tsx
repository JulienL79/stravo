import React from "react";
import { INavbarProps } from "./Navbar.props";
import { NavItem } from "@common-atoms/NavItem";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/useAuthStore";
import "./Navbar.css"
import { Button } from "@common-atoms/Button";
import { Icon } from "@common-atoms/Icon";

export const Navbar : React.FC<INavbarProps> = ({ 
    navLinks,
    className = ""
}) => {

    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if(className === "header") {
        return (
            <header>
                <div className="navbar">
                    <NavItem to="/" content={"S"} className="logo"/>
                    <div className="header-link nav-links">
                        {navLinks.map((link) => {
                            if(link.className === "logout") {
                                return <Button key={link.to} className="link logout" content={<Icon name="LogOut"/>} onClick={() => handleLogout()} />
                            }
                            return <NavItem key={link.to} to={link.to} className={link.className ? link.className : ""} name={link.name ? link.name : ""} content={link.content}/>
                        })}
                    </div>
                </div>
            </header>
        )
    }

    if(className === "footer") {
        return (
            <footer>
                <div className="navbar">
                    <div className="nav-links">
                        {navLinks.map((link) => {
                            return <NavItem key={link.to} to={link.to} className={link.className ? link.className : ""} name={link.name ? link.name : ""} content={link.content}/>
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
                    return <NavItem key={link.to} to={link.to} className={link.className ? link.className : ""} name={link.name ? link.name : ""} content={link.content}/>
                })}
            </div>
        </div>
    )
}