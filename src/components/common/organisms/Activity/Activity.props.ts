import { IActivity } from "./../../../../types/Activity"
import { IUser } from "./../../../../types/User"

export interface IActivityProps {
    activity: IActivity,
    ownerOfActivity?: IUser | undefined
}