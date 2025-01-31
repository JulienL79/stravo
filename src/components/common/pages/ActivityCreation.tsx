import { useNavigate } from "react-router-dom";
import { Form } from "@common-organisms/Form";
import { useState } from "react";
import { ErrorModal } from "@common-atoms/ErrorModal";
import { useCreateActivity } from "@hooks/mutations";
import { useAuthStore } from "@store/useAuthStore";

interface INewActivity {
    title: string,
    type: string,
    duration: number,
    elevGain: number,
    distance: number,
    place: string
}

export const ActivityCreation = () => {
    const { user } = useAuthStore()
    const { mutate : addActivity } = useCreateActivity()
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    const formFields = [
        { label: "Title", id: "title", type: "text", placeholder: "Titre de l'activité", required: true },
        { label: "Type", id: "type", type: "text", placeholder: "Type de l'activité", required: true },
        { label: "Distance", id: "distance", type: "number", placeholder: "Distance (km)", required: true, min:0, step:".01" },
        { label: "D+", id: "elevGain", type: "number", placeholder: "D+ (m)", required: true, min:0, step:".01" },
        { label: "Durée", id: "duration", type: "number", placeholder: "Durée (sec)", required: true, min:0, step:".01" },
        { label: "Lieu", id: "place", type: "text", placeholder: "Lieu de l'activité", required: true}
    ];

    const handleFormSubmit = (data: { [key: string]: string }) => {
        try {
            const activityData: INewActivity = {
                title: data.title,
                type: data.type,
                duration: parseFloat(data.duration),
                elevGain: parseFloat(data.elevGain),
                distance: parseFloat(data.distance),
                place: data.place,
            };

            if(user) {
                addActivity({user:user, activity: activityData});
            }

            setError("")
            navigate("/")
        }
        catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'inscription")
        }
    };

    return (
        <div className="page">
            <h1>Ajouter une activité</h1>
            <Form fields={formFields} onSubmit={handleFormSubmit} buttonContent="Ajouter"/>
            {
                error ? <ErrorModal message={error} onClose={() => setError("")} /> : <></>
            }
        </div>
    );
};
