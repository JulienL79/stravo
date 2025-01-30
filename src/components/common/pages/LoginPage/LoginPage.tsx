import { useAuthStore } from "@store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "@common-organisms/Form";
import { ErrorModal } from "@common-atoms/ErrorModal";
import { useState } from "react";
import "./LoginPage.css"

export const LoginPage = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("")

    const formFields = [
        { label: "Email", id: "email", type: "email", placeholder: "Entrez votre email", required: true },
        { label: "Mot de passe", id: "password", type: "password", placeholder: "Entrez votre mot de passe", required: true },
    ];

    const handleFormSubmit = async (data: { [key: string]: string }) => {
        try {
            await login(data.email, data.password)
            setError("")
            navigate("/");
        }
        catch (err : any) {
            setError(err.message || "Une erreur est survenue lors de la connexion")
        }
    };

    return (
        <div className="page">
            <h1>Connexion</h1>
            <Form fields={formFields} onSubmit={handleFormSubmit} buttonContent="Connexion"/>
            <div className="register-link">
                <p>Vous n'avez pas encore de compte?</p>
                <Link to="/register">Inscrivez-vous</Link>
            </div>
            {
               error ? <ErrorModal message={error} onClose={() => setError("")} /> : <></>
            }
        </div>
    )
}