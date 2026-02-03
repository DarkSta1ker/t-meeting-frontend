import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {AuthService} from '../app/services/AuthService';
import {AuthContextType, AuthData, AuthProviderProps, UserData} from '../shared/types/auth';

const defaultAuthContext: AuthContextType = {
    isAuth: false,
    isLoadingAuth: false,
    userData: null,
    authUser: async () => ({
        status: 'Error' as const,
        payload: 'Auth context not initialized',
    }),
    logoutUser: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);
    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('login');
        if (token && login) {
            setUserData({
                token,
                login,
            });
            setIsAuth(true);
        }
        setIsLoadingAuth(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const authUser = useCallback(async (authData: AuthData) => {
        setIsLoadingAuth(true);
        try {
            const result = await AuthService.loginUser(authData);
            if (result.status === 'Success') {
                setIsAuth(true);
                setUserData({
                    token: result.payload.token,
                    login: result.payload.login,
                });
                localStorage.setItem('token', result.payload.token);
                localStorage.setItem('login', result.payload.login);
            }
            return result;
        } finally {
            setIsLoadingAuth(false);
        }
    }, []);

    const logoutUser = useCallback(() => {
        setIsLoadingAuth(true);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuth(false);
        setIsLoadingAuth(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            isLoadingAuth,
            userData,
            authUser,
            logoutUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
