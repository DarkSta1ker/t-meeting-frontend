import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {ROUTES} from '../../shared/constants/constants';
import styles from './EventGuard.module.css';

export const PrivateRoute = () => {
    const {isAuth, isAuthChecking} = useAuth();
    const location = useLocation();

    if (isAuthChecking) {
        return <div className={styles.section}>Проверка авторизации...</div>;
    }

    if (!isAuth) {
        const fromLogout = location.state?.fromLogout;
        const backUrl = fromLogout
            ? ''
            : `?back=${encodeURIComponent(location.pathname + location.search)}`;
        return <Navigate to={`${ROUTES.AUTH}${backUrl}`} replace/>;
    }

    return <Outlet/>;
};
