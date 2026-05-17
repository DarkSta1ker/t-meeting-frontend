import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {ROUTES} from '../shared/constants/constants';

export const useAuthRedirect = (isAuth: boolean) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuth) {
            return;
        }
        const params = new URLSearchParams(location.search);
        const back = params.get('back');
        navigate(back ? decodeURIComponent(back) : ROUTES.EVENTS_LIST, {replace: true});
    }, [isAuth, location.search, navigate]);
};
