import {ReactNode} from 'react';

export interface AuthData {
    email: string;
    password: string;
}

export interface ValidationErrors {
    login?: string;
    password?: string;
}

export interface UserData {
    email: string;
    role: string;
}

export interface AuthContextType {
    isAuth: boolean;
    isLoadingAuth: boolean;
    userData: UserData | null;
    authUser: (authData: AuthData) => Promise<any>;
    regUser: (authData: AuthData) => Promise<any>;
    authError: string;
    setAuthError: (error: string) => void;
    logoutUser: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}
