import { create } from "zustand";
import { IUser } from "../types/User";

export const useAuthStore = create((set) => ({
    user: null as IUser | null,
    isAuthentificated: false,
    logout: () => set(() => ({user: null, isAuthentificated: false})),
    login: (userInfo : IUser) => set(() => ({user: userInfo, isAuthentificated: true}))
}))