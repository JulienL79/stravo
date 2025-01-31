import { fetchAllUsers } from "@api/userApi"
import { UserInfo } from "@common-molecules/UserInfo"
import { Skeleton } from "@common-atoms/Skeleton"
import { Separator } from "@common-atoms/Separator"
import { ErrorModal } from "@common-atoms/ErrorModal"
import { IUser } from "./../../../types/User"
import { useEffect, useState } from "react"

export const Search = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await fetchAllUsers()
                setUsers(users)
                setError("")
                setLoading(false)
            }
            catch(err : any) {
                setError(err.message)
            }
        }
        fetchUsers()
    },[])

    if(loading) {
        return (
            <div className="page">
                <h1>Liste des utilisateurs</h1>
                <Skeleton width="80%" height="40px" margin="0" />
                <Separator />
                <Skeleton width="80%" height="40px" margin="0" />
                <Separator />
                <Skeleton width="80%" height="40px" margin="0" />
                <Separator />
                <Skeleton width="80%" height="40px" margin="0" />
                <Separator />
                <Skeleton width="80%" height="40px" margin="0" />
                <Separator />
                <Skeleton width="80%" height="40px" margin="0" />
                <Separator />
            </div>
        )
    }

    return (
        <div className="page">
            <h1>Liste des utilisateurs</h1>
            {
                users && users.map((user) => {
                    return (
                        <div key={user.id}>
                            <UserInfo type="search" user_id={user.id} user_name={user.name} user_avatar={user.avatar} user_city={user.address}/>
                            <Separator/>
                        </div>
                    )
                })
            }
            {
                error ? <ErrorModal message={error} onClose={() => setError("")} /> : <></>
            }
        </div>
    )
}