import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));

  // Vérifie si getTokenFromLocalStorage est défini et si getTokenFromLocalStorage.token est défini
  // Utilisez une vérification plus robuste pour éviter les erreurs si localStorage.getItem("customer") est null
  const isAuthenticated = getTokenFromLocalStorage && getTokenFromLocalStorage.token;

  return isAuthenticated ? children : <Navigate to="/login" replace={true} />;
};
