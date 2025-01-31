import { Router } from "routes/Router"
import { useEffect } from "react"
import { useAuthStore } from "@store/useAuthStore"
import { InitialLoader } from "@common-atoms/InitialLoader"
import { Navbar } from "@common-molecules/Navbar"
import { Icon } from "@common-atoms/Icon"
import { INavItemProps } from "@common-atoms/NavItem"
import "./css-global/reset.css"
import "./css-global/main.css"

export const App = () => {
    const { fetchUser, isLoading, isAuthenticated } = useAuthStore()

    const headerList : INavItemProps[] =  isAuthenticated
    ? [
        {to:"/search", content:<Icon name="Search"/>},
        {to:"/logout", content:<Icon name="LogOut"/>, className:"logout"}
    ] : [
        {to:"/login", content:<Icon name="LogIn"/>}
    ]

    const footerList : INavItemProps[] = [
        {to:"/", content:<Icon name="House"/>},
        {to:"/mailbox", content:<Icon name="Mail"/>},
        {to:"/activity/add", content:<Icon name="CirclePlus"/>},
        {to:"/profile", content:<Icon name="User"/>}
    ]

    useEffect(() => {
        fetchUser()
    }, []);

    if (isLoading) return <></>

    return (
        <>
            <InitialLoader/>
            <Navbar navLinks={headerList} className="header"/>
            <Router/>
            {
                isAuthenticated ? <Navbar navLinks={footerList} className="footer"/> : <></>
            }
        </>

    )
}