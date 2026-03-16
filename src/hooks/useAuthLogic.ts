import {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {tokenManager} from '../api/tokenManager';
import {AuthService} from '../app/services/AuthService';
import {ROUTES} from '../shared/constants/constants';
import {AuthData, UserData} from '../shared/types/auth';

export const useAuthLogic = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [authError, setAuthError] = useState('');

    const authUser = useCallback(async (authData: AuthData) => {
        setIsLoadingAuth(true);
        setAuthError('');
        AuthService.loginUser(authData)
            .then((res) => {
                console.log('User logged in successfully');
                setIsAuth(true);
                tokenManager.startRefresh();
                AuthService.getUserData()
                    .then((resp) => {
                        setUserData(resp);
                    })
                    .catch((err) => {
                        console.log('Error while getting user data: ', err);
                    });
                const urlParams = new URLSearchParams(window.location.search);
                const backUrl = urlParams.get('back');

                if (backUrl) {
                    window.location.href = decodeURIComponent(backUrl);
                }
                return (res);
            })
            .catch((err) => {
                console.log('Error while fetching login user: ', err);
                setAuthError(err);
                return err;
            })
            .finally(() => {
                setIsLoadingAuth(false);
            });
    }, []);

    const logoutUser = useCallback(() => {
        setIsLoadingAuth(true);
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
        setAuthError
    };
};
