import { create } from "zustand";
import { IUser } from "../types/User";
import { getUser, loginAPI, logoutAPI, createUser} from "@api/userApi";

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

interface IAuthState {
    user: IUser | null
    isAuthenticated: boolean
    isLoading: boolean
    fetchUser: () => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => void,
    register: (name: string, address: string, email: string, password: string) => Promise<void>
}

export const useAuthStore = create<IAuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    // Récupérer l'utilisateur depuis le localStorage
    fetchUser: async () => {
        try {
            const user = await getUser();
            if(!user) {
                throw new Error ("Non Authentifié")
            }
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },
    // Connexion
    login: async (email : string, password : string) => {
        try {
            const user = await loginAPI(email, password);
            set({ user, isAuthenticated: true });
        } catch (error) {
            console.error("Erreur de connexion: ", error);
            throw error;
        }
    },
    // Déconnexion
    logout: () => {
        logoutAPI();
        set({ user: null, isAuthenticated: false });
    },
    // Inscription
    register: async (name: string, address: string, email: string, password: string) => {
        try {
            const today = new Date()
            const newUser: IUserRegister = { name, address, email, password, avatar:"", followers:[], followings:[], createdAt: today };
            const result = await createUser(newUser); // Appel à la fonction createUser
            if (result) {
                // Si l'utilisateur est créé avec succès, tu peux te connecter ou rediriger
                const user = await loginAPI(email, password); // Connecte immédiatement l'utilisateur après l'inscription
                set({ user, isAuthenticated: true });
            } else {
                throw new Error("Erreur lors de la création de l'utilisateur");
            }
        } catch (error : any) {
            console.error("Erreur lors de l'inscription: ", error);
            throw new Error(error.message);
        }
    }
}))