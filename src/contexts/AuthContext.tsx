import React, {createContext, useContext} from 'react';
import {useAuthLogic} from '../hooks/useAuthLogic';
import {AuthContextType, AuthProviderProps} from '../shared/types/auth';

const defaultAuthContext: AuthContextType = {
    isAuth: false,
    isLoadingAuth: false,
    userData: null,
    authUser: async () => ({
        status: 'Error' as const,
        payload: 'Auth context not initialized',
    }),
    logoutUser: () => {
    },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const authLogic = useAuthLogic();

    return (
        <AuthContext.Provider value={authLogic}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
