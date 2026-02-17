import {ReactNode} from 'react';

export interface AuthData {
    login: string;
    password: string;
}

export interface ValidationErrors {
    login?: string;
    password?: string;
}

export interface UserData {
    token: string;
    login: string;
}

export interface AuthContextType {
    isAuth: boolean;
    isLoadingAuth: boolean;
    userData: UserData | null;
    authUser: (authData: AuthData) => Promise<any>;
    logoutUser: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}
