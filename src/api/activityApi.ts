import axios from "axios";
import type { IActivity } from "@types/Activity";
import type { IUser, IFollowing } from "@types/User";

const API_URL = import.meta.env.VITE_API_URL

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
            throw new Error ("Erreur lors de la récupération des activités")
        }
        const activities: IActivity[] = response.data
        return activities
    } catch (err) {
        console.error("Erreur lors de la récupération de l'activité :", err)
    }
}

export const fetchFollowingsActivities = async (user : IUser) : Promise<IActivity[]>=> {
    try {
        const followings : IFollowing[] = user.followings

        const activitiesPromises = followings.map(async (following) => {
            return await fetchActivitiesOfUser(following.user_id)});
        // Attendre que toutes les requêtes soient terminées
        const activitiesArrays = await Promise.all(activitiesPromises);
        // Fusionner tous les tableaux d'activités en un seul
        const friendActivities = activitiesArrays.flat().filter(activity => activity !== null);

        return friendActivities
    } catch (err) {
        console.error("Erreur lors de la récupération des activités :", err)
    }
}

export const addActivity = async (activity : IActivity) : Promise<IActivity | null> => {
    try {
        await axios.post(`${API_URL}/activities`, {activity})
        return activity
    }
    catch(err) {
        console.error("Erreur lors de la création de l'activité:", err)
        return null
    }
}

export const deleteActivity = async (user_id : string, activity_id : string) : Promise<string | null> => {
    try {
        await axios.delete(`${API_URL}/users/${user_id}/activities/${activity_id}`)
        return activity_id
    }
    catch(err) {
        console.error("Erreur lors de la suppression de l'activité:", err)
        return null
    }
}

export const updateActivity = async (user_id : string, activity : IActivity) : Promise<IActivity | null> => {
    try {
        await axios.put(`${API_URL}/users/${user_id}/activities/${activity.id}`, activity)
        return activity
    }
    catch(err) {
        console.error("Erreur lors de la modification de l'activité:", err)
        return null
    }
}