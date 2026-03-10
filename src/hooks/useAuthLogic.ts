import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {tokenManager} from '../api/tokenManager';
import {AuthService} from '../app/services/AuthService';
import {ROUTES} from '../shared/constants/constants';
import {AuthData, UserData} from '../shared/types/auth';

export const useAuthLogic = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [authError, setAuthError] = useState('');

    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('login');
        if (token && login) {
            setUserData({token, login});
            setIsAuth(true);
        }
        tokenManager.startRefresh();
        setIsLoadingAuth(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const authUser = useCallback(async (authData: AuthData) => {
        setIsLoadingAuth(true);
        setAuthError('');

        try {
            const result = await AuthService.loginUser(authData);

            if (result.status === 'Success') {
                setIsAuth(true);
                const userData = {
                    token: result.payload.token,
                    login: result.payload.login,
                };
                tokenManager.startRefresh();
                setUserData(userData);
                localStorage.setItem('token', result.payload.token);
                localStorage.setItem('login', result.payload.login);

                const urlParams = new URLSearchParams(window.location.search);
                const backUrl = urlParams.get('back');

                if (backUrl) {
                    window.location.href = decodeURIComponent(backUrl);
                }

            } else {
                setAuthError(result.payload);
            }

            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка';
            setAuthError(errorMessage);
            return {status: 'Error', payload: errorMessage};
        } finally {
            setIsLoadingAuth(false);
        }
    }, []);

    const logoutUser = useCallback(() => {
        setIsLoadingAuth(true);
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        setIsAuth(false);
        setUserData(null);
        setIsLoadingAuth(false);
        tokenManager.stopRefresh();
        navigate(ROUTES.AUTH);
    }, [navigate]);

    const clearAuthError = useCallback(() => {
        setAuthError('');
    }, []);

    return {
        isAuth,
        isLoadingAuth,
        userData,
        authError,
        authUser,
        logoutUser,
        clearAuthError,
        checkAuth,
    };
};
