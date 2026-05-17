import {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {tokenManager} from '../api/tokenManager';
import {AuthService} from '../app/services/AuthService';
import {ROUTES} from '../shared/constants/constants';
import {AuthData, UserData} from '../shared/types/auth';

export const useAuthLogic = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const user = await AuthService.getUserData();
                if (cancelled) {
                    return;
                }
                setUserData(user);
                setIsAuth(true);
                tokenManager.startRefresh();
            } catch {
                if (cancelled) {
                    return;
                }
                setIsAuth(false);
                setUserData(null);
            } finally {
                if (!cancelled) {
                    setIsAuthChecking(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const authUser = useCallback(async (authData: AuthData) => {
        setIsLoadingAuth(true);
        setAuthError('');
        try {
            const res = await AuthService.loginUser(authData);
            setIsAuth(true);
            tokenManager.startRefresh();

            try {
                const user = await AuthService.getUserData();
                setUserData(user);
            } catch (err) {
                console.log('Error while getting user data: ', err);
            }

            const params = new URLSearchParams(location.search);
            const backUrl = params.get('back');
            if (backUrl) {
                navigate(decodeURIComponent(backUrl), {replace: true});
            } else {
                navigate(ROUTES.EVENTS_LIST, {replace: true});
            }
            return res;
        } catch (err) {
            setIsAuth(false);
            setAuthError(err as string);
            throw err;
        } finally {
            setIsLoadingAuth(false);
        }
    }, [navigate, location.search]);

    const regUser = useCallback(async (authData: AuthData) => {
        setIsLoadingAuth(true);
        setAuthError('');
        try {
            const res = await AuthService.regUser(authData);
            setIsAuth(true);
            tokenManager.startRefresh();
            try {
                const user = await AuthService.getUserData();
                setUserData(user);
            } catch (err) {
                console.log('Error while getting user data: ', err);
            }
            navigate(ROUTES.EVENTS_LIST, {replace: true});
            return res;
        } catch (err) {
            setAuthError(err as string);
            throw err;
        } finally {
            setIsLoadingAuth(false);
        }
    }, [navigate]);

    const logoutUser = useCallback(() => {
        navigate(ROUTES.AUTH, {replace: true});
        setIsAuth(false);
        setUserData(null);
        tokenManager.stopRefresh();
    }, [navigate]);

    const clearAuthError = useCallback(() => {
        setAuthError('');
    }, []);

    return {
        isAuth,
        isLoadingAuth,
        isAuthChecking,
        userData,
        authError,
        authUser,
        regUser,
        logoutUser,
        clearAuthError,
        setAuthError,
    };
};
