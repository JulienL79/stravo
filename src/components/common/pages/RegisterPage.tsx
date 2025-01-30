import { useAuthStore } from "@store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Form } from "@common-organisms/Form";
import { ReactNode, useState } from "react";
import { ErrorModal } from "@common-atoms/ErrorModal";

export const RegisterPage = () => {
    const { register } = useAuthStore();  // Je suppose que tu as une fonction register pour l'inscription
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    const formFields = [
        { label: "Nom", id: "name", type: "text", placeholder: "Entrez votre nom", required: true },
        { label: "Adresse", id: "address", type: "text", placeholder: "Entrez votre adresse", required: true },
        { label: "Email", id: "email", type: "email", placeholder: "Entrez votre email", required: true },
        { label: "Mot de passe", id: "password", type: "password", placeholder: "Entrez votre mot de passe", required: true },
        { label: "Confirmation", id: "passwordBis", type: "password", placeholder: "Entrez votre mot de passe", required: true }
    ];

    const handleFormSubmit = async (data: { [key: string]: string }) => {
        try {
            if(data.password !== data.passwordBis) {
                throw new Error("Les mots de passe ne sont pas identiques")
            }
            // Enregistrer l'utilisateur en utilisant les données du formulaire
            await register(data.name, data.address, data.email, data.password);
            setError("")
            navigate("/")
        }
        catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'inscription")
        }
    };

    return (
        <div className="page">
            <h1>Inscription</h1>
            <Form fields={formFields} onSubmit={handleFormSubmit} buttonContent="Inscription"/>
            {
                error ? <ErrorModal message={error} onClose={() => setError("")} /> : <></>
            }
        </div>
    );
};
