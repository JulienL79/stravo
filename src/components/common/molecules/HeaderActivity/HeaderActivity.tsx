import { Link } from "react-router-dom"
import { Image } from "@common-atoms/Image"
import { IHeaderActivityProps } from "./HeaderActivity.props"
import { formatDateToString } from "@utils/dateConverter"
import "./HeaderActivity.css"
import React from "react"

export const HeaderActivity : React.FC<IHeaderActivityProps> = ({activity, owner}) => {
    const newDate = formatDateToString(activity.createdAt)

    return (
        <div className="header-activity">
            <Link to={`users/${activity.user_id}`}>
                <Image className="avatar" src={owner.avatar} alt={owner.name}/>
            </Link>
            <div className="header-activity-info">
                <h3>{owner.name}</h3>
                <p className="header-date">Fait le {newDate} à {activity.place}</p>
                <p className="header-type">Type : {activity.type}</p>
            </div>
        </div>
    )
}