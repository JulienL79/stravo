import { Activity } from "@common-organisms/Activity"
import { useAuthStore } from "@store/useAuthStore"
import { useHomeActivities } from "@hooks/queries"
import { useFollowUser } from "@hooks/mutations"
import { useEffect } from "react"

export const Home = () => {
    const { user } = useAuthStore()
    const { data, isLoading, isError, error, refetch, isFetching } = useHomeActivities(user)
    const { mutate: followUser} = useFollowUser()

    useEffect(() => {
        console.log(user)
        console.log(data)
    }, [user, data])

    if(isFetching || isError) {
        return (
            <div className="page">
                En cours de chargement
            </div>
        )
    }

    return (
        <div className="page">
            {
                !data ?
                    <h1>Vous n'avez aucune activité dans votre fil d'actualité</h1>
                :
                    data.map(activity => {
                        return <Activity key={activity.id} activity={activity}/>
                    })
            }
        </div>
    )
}