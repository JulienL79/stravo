import axios from "axios";
import type { IUser } from "../types/User";

const API_URL = import.meta.env.VITE_API_URL

export const fetchUser = async (user_id : string) : Promise<IUser | null> => {
    try {
        const response = await axios.get(`${API_URL}/users/${user_id}`)
        const user: IUser = response.data
        return { ...user, createdAt: new Date(user.createdAt) }
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err)
        return null
    }
}

export const fetchAllUsers = async () : Promise<IUser[] | null>=> {
    try {
        const response = await axios.get(`${API_URL}/users`)
        const users: IUser[] = response.data
        return users
    } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err)
        return null
    }
}

export const addUser = async (user : IUser) : Promise<boolean> => {
    try {
        await axios.post(`${API_URL}/users`, {user})
        return true
    }
    catch(err) {
        console.error("Erreur lors de la création de l'utilisateur:", err)
        return false;
    }
}

export const deleteUser = async (user_id : string) : Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/users/${user_id}`)
        return true
    }
    catch(err) {
        console.error("Erreur lors de la suppression de l'utilisateur:", err)
        return false;
    }
}

export const updateUser = async (user : IUser) : Promise<boolean> => {
    try {
        await axios.put(`${API_URL}/users/${user.id}`, user)
        return true
    }
    catch(err) {
        console.error("Erreur lors de la modification de l'utilisateur:", err)
        return false;
    }
}