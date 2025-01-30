export interface IFollower {
    user_id: string,
    user_name: string,
    user_avatar: string
}

export interface IFollowing {
    user_id: string,
    user_name: string,
    user_avatar: string
}

export interface IUser {
    createdAt: Date | string,
    id: string,
    name: string,
    avatar: string,
    address: string,
    followers: IFollower[],
    followings: IFollowing[],
    email?: string,
    password?: string
}