import { Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Home } from "@common-pages/Home"
import { ActivityDetails } from "@common-pages/ActivityDetails"
import { Profile } from "@common-pages/Profile"
import { NotFound } from "@common-pages/Not found"
import { PrivateRoute } from "./PrivateRoute"
import { LoginPage } from "@common-pages/LoginPage"
import { RegisterPage } from "@common-pages/RegisterPage"

export const Router = () => {

    return (
        <Routes>
            <Route path="/login" element={
                <>
                    <Helmet>
                        <title>Connexion</title>
                    </Helmet>
                    <LoginPage />
                </>
            } />

            <Route path="/register" element={
                <>
                    <Helmet>
                        <title>Inscription</title>
                    </Helmet>
                    <RegisterPage />
                </>
            } />

            <Route element={<PrivateRoute />}>
                <Route path="/" element={
                    <>
                        <Helmet>
                            <title>Accueil</title>
                        </Helmet>
                        <Home />
                    </>
                } />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/activity/:id" element={
                    <>
                        <Helmet>
                            <title>Détail de l'activité</title>
                        </Helmet>
                        <ActivityDetails />
                    </>
                } />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={
                    <>
                        <Helmet>
                            <title>Mon profil</title>
                        </Helmet>
                        <Profile />
                    </>
                } />
            </Route>


            <Route path="*" element={
                <>
                    <Helmet>
                        <title>Page non trouvée</title>
                    </Helmet>
                    <NotFound />
                </>
            } />
        </Routes>
    )
}