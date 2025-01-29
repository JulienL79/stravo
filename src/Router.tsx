import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Home } from "@common-pages/Home"
import { Activity } from "@common-pages/Activity"
import { Profile } from "@common-pages/Profile"
import { NotFound } from "@common-pages/Not found"

function Router() {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={
          <>
            <Helmet>
              <title>Accueil</title>
            </Helmet>
            <Home/>
          </>
        }/>
        <Route path="/activity/:id" element={
          <>
            <Helmet>
              <title>Détail de l'activité</title>
            </Helmet>
            <Activity/>
          </>
        }/>
        <Route path="/profile" element={
          <>
            <Helmet>
              <title>Mon profil</title>
            </Helmet>
            <Profile/>
          </>
        }/>
        <Route path="*" element={
          <>
            <Helmet>
              <title>Page non trouvée</title>
            </Helmet>
            <NotFound/>
          </>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router