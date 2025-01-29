import { Icon } from "@common-atoms/Icon"
import { Link } from "react-router-dom"
import { Button } from "@common-atoms/Button"
import { IFooterActivityProps } from "./FooterActivity.props"
import { useUpdateActivity } from "@hooks/mutations"
import { useAuthStore } from "@store/useAuthStore"
import { useState } from "react"
import "./FooterActivity.css"
import React from "react"
import { IActivity } from "../../../../types/Activity"

export const FooterActivity : React.FC<IFooterActivityProps> = ({activity}) => {
    const { mutate: updateActivity } = useUpdateActivity()
    const { user } = useAuthStore()
    const [isLiked, setIsLiked] = useState<boolean>(user ? activity.likes.some(liker => liker.user_id === user.id) : false)

    const handleLike = () => {
        if(user) {
            const updatedActivity: IActivity = {
                ...activity,
                likes: isLiked
                    ? activity.likes.filter(liker => liker.user_id !== user.id) // Retirer le like
                    : [...activity.likes, { user_id: user.id, user_name: user.name }] // Ajouter le like
            }
    
            setIsLiked(!isLiked)
            updateActivity(updatedActivity)
    
        }
    }

    return (
        <div className="footer-activity">
            <Button className={`footer-btn ${isLiked ? "liked" : ""}`} content={<Icon name="ThumbsUp"/>} onClick={handleLike}/>
            <Link to={`activity/${activity.id}/comments`}>
                <Icon name="MessageSquareText"/>
            </Link>
        </div>
    )
}