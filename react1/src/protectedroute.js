
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({redirectPath, condition}) => {
    
    if (condition) {
        return <Outlet/>
    } else {
        return <Navigate to={redirectPath} replace/>
    }

}

export default ProtectedRoute;