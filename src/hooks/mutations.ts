import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addActivity, updateActivity, deleteActivity } from "@api/activityApi";
import { IActivity } from "../types/Activity";

export const useCreateActivity = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addActivity,
        onSuccess: (newActivity: IActivity | null) => {

            if(newActivity) {
                // Mettre à jour les données dans le cache pour la requête "personnal-activities"
                queryClient.setQueryData(["personnal-activities", newActivity.user_id], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return [newActivity]; // Si pas d'activités, initialise avec la nouvelle activité
                    return [...oldActivities, newActivity]; // Sinon, ajoute la nouvelle activité
                });

                // Mettre à jour les données dans le cache pour la requête "home-activities"
                queryClient.setQueryData(["home-activities", newActivity.user_id], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return [newActivity]; // Si pas d'activités, initialise avec la nouvelle activité
                    return [...oldActivities, newActivity]; // Sinon, ajoute la nouvelle activité
                });
            }
        }
    })
}

export const useUpdateActivity = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateActivity,
        onSuccess: (updatedActivity: IActivity | null) => {

            if(updatedActivity) {
                // Mettre à jour les données dans le cache pour la requête "personnal-activities"
                queryClient.setQueryData(["personnal-activities", updatedActivity.user_id], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return [updatedActivity]; // Si pas d'activités, initialise avec la nouvelle activité
                    // Remplacer l'ancienne activité par la mise à jour
                    return oldActivities.map((activity) =>
                        activity.id === updatedActivity.id ? updatedActivity : activity
                    );
                });

                // Mettre à jour les données dans le cache pour la requête "home-activities"
                queryClient.setQueryData(["home-activities", updatedActivity.user_id], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return [updatedActivity]; // Si pas d'activités, initialise avec la nouvelle activité
                    // Remplacer l'ancienne activité par la mise à jour
                    return oldActivities.map((activity) =>
                        activity.id === updatedActivity.id ? updatedActivity : activity
                    );
                });
            }
        }
    })
}

export const useDeleteActivity = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteActivity,
        onSuccess: (deletedActivityId: string | null) => {

            if(deletedActivityId) {
                // Mettre à jour les données dans le cache pour la requête "personnal-activities"
                queryClient.setQueryData(["personnal-activities", deletedActivityId], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return []; // Si aucune activité, retourne un tableau vide
                    // Supprimer l'activité du cache
                    return oldActivities.filter((activity) => activity.id !== deletedActivityId);
                });

                // Mettre à jour les données dans le cache pour la requête "home-activities"
                queryClient.setQueryData(["home-activities", deletedActivityId], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return []; // Si aucune activité, retourne un tableau vide
                    // Supprimer l'activité du cache
                    return oldActivities.filter((activity) => activity.id !== deletedActivityId);
                });
            }
        }
    })
}