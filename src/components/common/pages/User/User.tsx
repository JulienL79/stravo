import { fetchUserById } from "@api/userApi"
import { useAuthStore } from "@store/useAuthStore"
import { IUser } from "./../../../../types/User"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Skeleton } from "@common-atoms/Skeleton"
import { UserInfo } from "@common-molecules/UserInfo"
import { ErrorModal } from "@common-atoms/ErrorModal"
import { Button } from "@common-atoms/Button"
import { useFollowUser, useUnFollowUser } from "@hooks/mutations"
import "./User.css"
import { useHomeActivities } from "@hooks/queries"


export const User = () => {
    const { user } = useAuthStore()
    const { data } = useHomeActivities(user)
    const { id: user_id } = useParams<{ id: string }>()
    const [userVisited, setUserVisited] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const { mutate : followUser } = useFollowUser()
    const { mutate : unfollowUser } = useUnFollowUser()
    const [isLiked, setIsLiked] = useState(user && user.followings.some(followedUser => followedUser.user_id === user_id))

    const handleFollow = () => {
        try {

            if(userVisited && user) {
                followUser({user: user, userToFollowID: userVisited.id});
            }
            setError("")
        }
        catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'inscription")
        }
    }

    const handleUnFollow = () => {
        try {

            if(userVisited && user) {
                unfollowUser({user: user, userToUnFollowID: userVisited.id});
            }
            setError("")
        }
        catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'inscription")
        }
    }

    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetchUserById(user_id)
                setUserVisited(response)
                setError("")
                setLoading(false)
            }
            catch (err: any) {
                setError(err.message)
            }

        }
        const checkIsFollowed = () => {
            setIsLiked(user && user.followings.some(followedUser => followedUser.user_id === user_id))
        }
        fetchUser()
        checkIsFollowed()
    }, [data])

    if (loading) {
        return (
            <div className="page">
                <h1>Profil de l'utilisateur</h1>
                <div className="user-profile">
                    <Skeleton width="100%" height="80px" margin="0" />
                    <Skeleton width="20%" height="30px" margin="2rem 0" />
                </div>
            </div>
        )
    }

    return (
        <div className="page">
            <h1>Profil de l'utilisateur</h1>
            {
                userVisited &&
                <div className="user-profile">
                    <UserInfo type="header" user_id={userVisited.id} user_name={userVisited.name} user_avatar={userVisited.avatar} user_city={userVisited.address} />
                    <Button content={isLiked ? "Ne plus suivre" : "Suivre"} onClick={isLiked ? () => handleUnFollow() : () => handleFollow()}/>
                </div>
            }
            {
                error ? <ErrorModal message={error} onClose={() => setError("")} /> : <></>
            }
        </div>
    )
}