export interface ILike {
    user_id: string,
    user_name: string,
    user_avatar: string
}

export interface IComment {
    id: string,
    user_id: string,
    user_name: string,
    user_avatar: string,
    date: Date,
    content: string
}

export interface IActivity {
    createdAt: Date,
    id: string,
    title: string,
    type: string,
    duration: number,
    user_id: string,
    elevGain: number,
    distance: number,
    place: string,
    likes: ILike[],
    comments: IComment[],
}