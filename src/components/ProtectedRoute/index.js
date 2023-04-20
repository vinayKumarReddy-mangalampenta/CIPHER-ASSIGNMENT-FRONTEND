import Cookies from 'js-cookie'
import { Navigate } from "react-router-dom"
const ProtectedRoute = ({ children }) => {
    const accessToken = Cookies.get("access-token")
    const username = Cookies.get("username")

    if (!username || !accessToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute

