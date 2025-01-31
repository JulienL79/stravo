import axios from "axios";
import type { IActivity } from "./../types/Activity";
import type { IUser, IFollowing } from "./../types/User";

const API_URL = import.meta.env.VITE_API_URL

interface INewActivity {
        title: string,
        type: string,
        duration: number,
        elevGain: number,
        distance: number,
        place: string,
}

export const fetchActivity = async (activity_id : string) : Promise<IActivity | null> => {
    try {
        const response = await axios.get(`${API_URL}/activities/${activity_id}`)
        const activity: IActivity = response.data
        return { ...activity, createdAt: new Date(activity.createdAt) }
    } catch (err) {
        console.error("Erreur lors de la récupération de l'activité :", err)
        return null
    }
}

export const fetchAllActivities = async () : Promise<IActivity[] | null>=> {
    try {
        const response = await axios.get(`${API_URL}/activities`)
        const activities: IActivity[] = response.data
        return activities
    } catch (err) {
        console.error("Erreur lors de la récupération des activités :", err)
        return null
    }
}

export const fetchActivitiesOfUser = async (user_id : string) : Promise<IActivity[]> => {
    try {
        const response = await axios.get(`${API_URL}/users/${user_id}/activities`)
        
        if(!response) {
            throw new Error("Erreur lors de la récupération de l'activité");
        } 
        const activities= response.data
        return activities
    } catch (err) {
        console.error("Erreur lors de la récupération de l'activité :", err)
        return []
    }
}

export const fetchHomeActivities = async (user : IUser) : Promise<IActivity[]>=> {
    try {
        const users : IFollowing[] = [...user.followings, {user_id: user.id, user_name: user.name, user_avatar: user.avatar}]

        const activitiesPromises = users.map(async (following) => {
            return await fetchActivitiesOfUser(following.user_id)});
        // Attendre que toutes les requêtes soient terminées
        const activitiesArrays = await Promise.all(activitiesPromises);
        // Fusionner tous les tableaux d'activités en un seul
        const homeActivities = activitiesArrays
        .flat()
        .filter(activity => activity !== null)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return homeActivities
    } catch (err) {
        console.error("Erreur lors de la récupération des activités :", err)
        throw new Error("Erreur lors de la récupération de l'activité");
    }
}

export const addActivity = async (owner: IUser, activity : INewActivity) : Promise<IActivity> => {
    try {
        const today = new Date ()
        const newActivity = {...activity, createdAt: today, likes: [], comments:[]}
        const response = await axios.post(`${API_URL}/users/${owner.id}/activities`, newActivity)
        const activityCreated = response.data
        return activityCreated
    }
    catch(err) {
        console.error("Erreur lors de la création de l'activité:", err)
        throw new Error("Erreur lors de la création de l'activité");
    }
}

export const deleteActivity = async (user_id : string, activity_id : string) : Promise<string> => {
    try {
        await axios.delete(`${API_URL}/users/${user_id}/activities/${activity_id}`)
        return activity_id
    }
    catch(err) {
        console.error("Erreur lors de la suppression de l'activité:", err)
        throw new Error("Erreur lors de la suppression de l'activité");
    }
}

export const updateActivity = async (owner: IUser, activity : IActivity) : Promise<IActivity> => {
    try {
        await axios.put(`${API_URL}/users/${owner.id}/activities/${activity.id}`, activity)
        return activity
    }
    catch(err) {
        console.error("Erreur lors de la modification de l'activité:", err)
        throw new Error("Erreur lors de la modification de l'activité");
    }
}