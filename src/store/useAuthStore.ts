import { create } from "zustand";
import { IUser } from "../types/User";

interface AuthState {
    user: IUser | null;
    isAuthentificated: boolean;
    login: (userInfo: IUser) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthentificated: false,
    logout: () => set(() => ({user: null, isAuthentificated: false})),
    login: (userInfo : IUser) => set(() => ({user: userInfo, isAuthentificated: true}))
}))