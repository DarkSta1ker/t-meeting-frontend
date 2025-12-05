import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import { AuthService } from '../app/services/AuthService';
import { AuthData } from '../shared/types/auth';
import {UserData, AuthContextType, AuthProviderProps} from "../shared/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    const checkAuth =useCallback(()=>{
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if(token&&role){
            setUserData({
                token: token,
                role: role,
            })
            setIsAuth(true);
        }
    },[])

    useEffect(() => {
        checkAuth()
    }, [checkAuth]);

    const loginUser = useCallback(async (authData: AuthData) => {
        setIsLoadingAuth(true);
        try {
            const result = await AuthService.loginUser(authData);
            if (result.status === 'Success') {
                setIsAuth(true);
                setUserData({
                    token: result.payload.token,
                    role: result.payload.role
                });
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.setItem('token', result.payload.token);
                localStorage.setItem('role', result.payload.role);
            }
            return result;
        } finally {
            setIsLoadingAuth(false);
        }
    }, []);

    const logoutUser = useCallback(()=>{
        setIsLoadingAuth(true);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuth(false);
        setIsLoadingAuth(false);
    },[])


    return (
        <AuthContext.Provider value={{
            isAuth,
            isLoadingAuth,
            userData,
            loginUser,
            logoutUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};