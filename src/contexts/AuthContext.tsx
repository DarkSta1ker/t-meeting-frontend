import React, {createContext, useContext} from 'react';
import {useAuthLogic} from '../hooks/useAuthLogic';
import {defaultAuthContext} from '../shared/constants/constants';
import {AuthContextType, AuthProviderProps} from '../shared/types/auth';

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
