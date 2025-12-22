import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

export const PrivateRoute = () => {
    const {isAuth, isLoadingAuth} = useAuth();
    if (isLoadingAuth) {
        return <div>Проверка авторизации...</div>;
    }
    if (isAuth) {
        return <Outlet/>;
    } else {
        return <Navigate to="/"/>;
    }
};
