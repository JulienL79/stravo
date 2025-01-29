export interface ILike {
    user_id: string,
    user_name: string,
}

export interface IComment {
    id: string,
    user_id: string,
    user_name: string,
    date: Date,
    content: string
}

export interface IActivity {
    createdAt: Date,
    id: string,
    title: string,
    type: string,
    time: number,
    user_id: string,
    elevGain: number,
    distance: number,
    place: string,
    likes: ILike[],
    comments: IComment[],
}