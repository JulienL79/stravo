import { IActivityProps } from "./Activity.props";
import React, { useEffect, useState } from "react";
import { IUser } from "./../../../../types//User";
import { fetchUserById } from "@api/userApi";
import "./Activity.css"
import { Skeleton } from "@common-atoms/Skeleton";
import { HeaderActivity } from "@common-molecules/HeaderActivity";
import { FooterActivity } from "@common-molecules/FooterActivity";
import { formatDuration } from "@utils/dateConverter";
import { Icon } from "@common-atoms/Icon";
import { Separator } from "@common-atoms/Separator";

export const Activity : React.FC<IActivityProps> = ({activity, ownerOfActivity = null}) => {
    const [owner, setOwner] = useState<IUser | null>(ownerOfActivity)
    const durationFormated = formatDuration(activity.duration)
    const nbLike = activity.likes.length

    useEffect(() => {
        if(!owner) {
            const fetchOwnerData = async () => {
                const ownerInfo = await fetchUserById(activity.user_id)
                if(ownerInfo) 
                    setOwner(ownerInfo)
            }
            fetchOwnerData();
        }
    }, [])

    if(!owner) {
        return (
            <div className="activity-card">
                <Skeleton width="100%" height="80px" margin="0"/>
                <Separator />
                <Skeleton width="100%" height="30px" />
                <div className="activity-stats">
                    <div className="stat">
                        <Skeleton width="90%" height="40px" margin="0"/>
                    </div>
                    <div className="stat">
                        <Skeleton width="90%" height="40px" margin="0"/>
                    </div>
                    <div className="stat">
                        <Skeleton width="90%" height="40px" margin="0"/>
                    </div>
                </div>
                <div className="like-stat">
                    <Skeleton width="20%" height="30px" margin="0"/>
                </div>
                <Separator />
                <Skeleton width="100%" height="40px" margin="0"/>
            </div>
        )
    }
    
    return (
        <div className="activity-card">
            <HeaderActivity activity={activity} owner={owner}/>

            <Separator />

            <h2>{activity.title}</h2>

            <div className="activity-stats">
                <div className="stat">
                    <p className="title-stat">Distance</p>
                    <p className="data-stat">{activity.distance} km</p>
                </div>
                <div className="stat">
                    <p className="title-stat">D+</p>
                    <p className="data-stat">{activity.elevGain} m</p>
                </div>
                <div className="stat">
                    <p className="title-stat">Durée</p>
                    <p className="data-stat">{durationFormated}</p>
                </div>
            </div>

            <div className="like-stat">
                <span>{nbLike}</span>
                <Icon name="Heart"/>
            </div>

            <Separator />

            <FooterActivity activity={activity}/>
        </div>
    )
}