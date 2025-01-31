import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addActivity, updateActivity, deleteActivity } from "@api/activityApi";
import { followUser, unFollowUser } from "@api/userApi";
import { IActivity } from "./../types/Activity";
import { IUser } from "./../types/User";

interface INewActivity {
    title: string,
    type: string,
    duration: number,
    elevGain: number,
    distance: number,
    place: string
}

export const useCreateActivity = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ user, activity }: { user: IUser; activity : INewActivity}) =>
            addActivity(user, activity),
        onSuccess: (activityCreated: IActivity) => {
            if(activityCreated) {
                // Mettre à jour les données dans le cache pour la requête "personnal-activities"
                queryClient.setQueryData(["personnal-activities"], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return [activityCreated]; // Si pas d'activités, initialise avec la nouvelle activité
                    return [...oldActivities, activityCreated]; // Sinon, ajoute la nouvelle activité
                });

                // Mettre à jour les données dans le cache pour la requête "home-activities"
                queryClient.setQueryData(["home-activities"], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return [activityCreated]; // Si pas d'activités, initialise avec la nouvelle activité
                    return [...oldActivities, activityCreated]; // Sinon, ajoute la nouvelle activité
                });
            }
        },
        onError: (error) => {
            // Gérer l'erreur ici, si nécessaire
            console.error("Erreur lors de la création de l'activité", error);
        }
    })
}

export const useUpdateActivity = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ user, activity }: { user: IUser; activity : IActivity}) =>
            updateActivity(user, activity),
        onSuccess: (updatedActivity : IActivity) => {

            if(updatedActivity) {
                // Mettre à jour les données dans le cache pour la requête "personnal-activities"
                queryClient.setQueryData(["personnal-activities"], (oldActivities: IActivity[] | undefined) => {
                    if (!oldActivities) return [updatedActivity]; // Si pas d'activités, initialise avec la nouvelle activité
                    // Remplacer l'ancienne activité par la mise à jour
                    return oldActivities.map((activity) =>
                        activity.id === updatedActivity.id ? updatedActivity : activity
                    );
                });

                // Mettre à jour les données dans le cache pour la requête "home-activities"
                queryClient.setQueryData(["home-activities"], (oldActivities: IActivity[] | undefined) => {
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
        mutationFn: ({ user_id, activity_id }: { user_id: string; activity_id : string }) => 
            deleteActivity(user_id, activity_id),
        onSuccess: (deletedActivityId: string) => {

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

export const useFollowUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ user, userToFollowID }: { user: IUser; userToFollowID: string }) =>
            followUser(user, userToFollowID),
        onSuccess: (updatedCurrentUser: IUser) => {
            if(updatedCurrentUser) {
                queryClient.invalidateQueries({ queryKey: ["home-activities"] })
            }
        }
    })
}

export const useUnFollowUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ user, userToUnFollowID }: { user: IUser; userToUnFollowID: string }) =>
            unFollowUser(user, userToUnFollowID),
        onSuccess: (updatedCurrentUser: IUser) => {
            if(updatedCurrentUser) {
                queryClient.invalidateQueries({ queryKey: ["home-activities"] })
            }
        }
    })
}