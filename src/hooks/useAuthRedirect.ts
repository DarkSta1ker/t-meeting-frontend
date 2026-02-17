import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../shared/constants/constants';

export const useAuthRedirect = (isAuth: boolean, redirectPath = ROUTES.EVENTS_LIST) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate(redirectPath);
        }
    }, [isAuth, navigate, redirectPath]);
};
