import { IUser } from "./../../../../types/User"
import { IActivity } from "./../../../../types/Activity"

export interface IHeaderActivityProps {
    activity: IActivity,
    owner: IUser
}