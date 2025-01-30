import axios from "axios";
import { IUser } from "@types/User";

const API_URL = import.meta.env.VITE_API_URL

interface IUserRegister {
    createdAt: Date,
    name: string,
    avatar: string,
    address: string,
    followers: [],
    followings: [],
    email?: string,
    password?: string
}

export const fetchUserById = async (user_id : string) : Promise<IUser | null> => {
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

export const createUser = async (userInformation : IUserRegister) : Promise<boolean> => {
    try {
        const allUsers = await fetchAllUsers()
        const isExist = allUsers && allUsers.find(user => user.email === userInformation.email)

        if(isExist) throw new Error("L'utilisateur existe déjà")

        const hashedPassword = userInformation.password
        const user = {...userInformation, password: hashedPassword}
        const response = await axios.post(`${API_URL}/users`, user)
        console.log(response)
        return true
    }
    catch(err) {
        throw new Error("L'utilisateur existe déjà")
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

export const getUser = async (): Promise<IUser | null> => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const loginAPI = async (email: string, password: string): Promise<IUser | null> => {
    try {
        const users : IUser[] | null = await fetchAllUsers();
        if(!users) {
            throw new Error("Erreur lors de la récupération des utilisateurs");
        }

        const user = users.find(user => user.email === email)

        if (user === undefined) {
            throw new Error("Identifiants incorrects");
        }

        const isMatch = user ? password === user.password : false;

        if (!isMatch) {
            throw new Error("Identifiants incorrects");
        }

        localStorage.setItem("user", JSON.stringify(user));

        return user;
    } catch (err) {
        console.error("Erreur de connexion :", err);
        throw err;
    }
};

export const logoutAPI = () => {
    localStorage.removeItem("user");
};

export const followUser = async (user : IUser, user_id : string) : Promise<IUser | null> => {
    try {
        let userToFollow = await fetchUserById(user_id)

        if(!userToFollow) throw new Error ("Erreur lors du follow")

        user = {...user, followings: [...user.followings, {user_id: userToFollow.id, user_name: userToFollow.name, user_avatar: userToFollow.avatar}]}
        userToFollow = {...userToFollow, followers: [...userToFollow.followers, {user_id: user.id, user_name: user.name, user_avatar: user.avatar}]}
        
        const firstUpdate = await updateUser(user)
        const secondUpdate = await updateUser(userToFollow)

        if (!firstUpdate || !secondUpdate) throw new Error ("Erreur lors du follow")

        return user
    }
    catch(err) {
        console.error("Erreur lors du follow", err);
        return null
    }
}

export const unFollowUser = async (user : IUser, user_id : string) : Promise<IUser | null> => {
    try {
        let userToUnFollow = await fetchUserById(user_id)

        if(!userToUnFollow) throw new Error ("Erreur lors du follow")

        user = {...user, followings: user.followings.filter(following => following.user_id === user_id)}
        userToUnFollow = {...userToUnFollow, followers: userToUnFollow.followers.filter(follower => follower.user_id === user.id)}
        
        const firstUpdate = await updateUser(user)
        const secondUpdate = await updateUser(userToUnFollow)

        if (!firstUpdate || !secondUpdate) throw new Error ("Erreur lors du follow")

        return user
    }
    catch(err) {
        console.error("Erreur lors du follow", err);
        return null
    }
}