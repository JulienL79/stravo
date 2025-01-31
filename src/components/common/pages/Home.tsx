import { Activity } from "@common-organisms/Activity"
import { useAuthStore } from "@store/useAuthStore"
import { useHomeActivities } from "@hooks/queries"
import { useEffect, useState } from "react"
import { Skeleton } from "@common-atoms/Skeleton"
import { Separator } from "@common-atoms/Separator"
import { IUser } from "./../../../types/User"

export const Home = () => {
    const { user } = useAuthStore()
    const { data, isLoading, isError, error, isFetching } = useHomeActivities(user as IUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setLoading(false)
        }
    }, [isFetching, isLoading])

    if (loading || isFetching || isLoading) {
        return (
            <div className="page">
                <h1>Fil d'actualité</h1>
                <div className="activity-card">
                    <Skeleton width="100%" height="80px" margin="0" />
                    <Separator />
                    <Skeleton width="100%" height="30px" />
                    <div className="activity-stats">
                        <div className="stat">
                            <Skeleton width="90%" height="40px" margin="0" />
                        </div>
                        <div className="stat">
                            <Skeleton width="90%" height="40px" margin="0" />
                        </div>
                        <div className="stat">
                            <Skeleton width="90%" height="40px" margin="0" />
                        </div>
                    </div>
                    <div className="like-stat">
                        <Skeleton width="20%" height="30px" margin="0" />
                    </div>
                    <Separator />
                    <Skeleton width="100%" height="40px" margin="0" />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="page">
                Une erreur est survenue : {error.message}
            </div>
        )
    }

    return (
        <div className="page">
            <h1>Fil d'actualité</h1>
            {
                !data || !data[0] || data.length === 0 ?
                    <h1>Vous n'avez aucune activité dans votre fil d'actualité</h1>
                    :
                    data.map(activity => {
                        return <Activity key={activity.id} activity={activity} />
                    })
            }
        </div>
    )
}