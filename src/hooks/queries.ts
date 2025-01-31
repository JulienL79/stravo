import { useQuery } from "@tanstack/react-query";
import { fetchHomeActivities, fetchActivitiesOfUser, fetchAllActivities } from "@api/activityApi";
import type { IUser } from "../types/User";

export const useAllActivities = () => {
    return useQuery({
        queryKey: ["all-activities"],
        queryFn: () => fetchAllActivities()
    })
}

export const usePersonnalActivities = (user_id: string) => {
    return useQuery({
        queryKey: ["personnal-activities"],
        queryFn: () => fetchActivitiesOfUser(user_id),
        enabled: !!user_id, // S'assurer que user_id est défini avant d'exécuter la requête
    })
}

export const useHomeActivities = (user: IUser) => {
    return useQuery({
        queryKey: ["home-activities"],
        queryFn: () => fetchHomeActivities(user),
        enabled: !!user, // S'assurer que user est défini avant d'exécuter la requête
    })
}