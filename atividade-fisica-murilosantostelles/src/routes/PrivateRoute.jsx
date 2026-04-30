import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



function PrivateRoute({ children }) {
    const { usuario } = useAuth()
    return usuario ? children : <Navigate to="/login" />
}

export default PrivateRoute