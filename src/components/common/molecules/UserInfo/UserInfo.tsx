import { Link } from "react-router-dom"
import { Image } from "@common-atoms/Image"
import { IUserInfoProps } from "./UserInfo.props"
import "./UserInfo.css"
import React from "react"

export const UserInfo : React.FC<IUserInfoProps> = ({type, user_id, user_name, user_avatar, user_city}) => {

    if(type === "search") {
        return (
            <Link className="user-info search" to={`/users/${user_id}`}>
                <Image className="avatar" src={user_avatar} alt={user_name}/>
                <p>{user_name}</p>
                <p>Habite à {user_city}</p>
            </Link>
        )
    }
    return (
        <div className="user-info header">
            <Image className="avatar" src={user_avatar} alt={user_name}/>
            <p>{user_name}</p>
            <p>{user_city}</p>
        </div>
    )
}