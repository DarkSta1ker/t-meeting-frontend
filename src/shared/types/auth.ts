import {ReactNode} from "react";

export interface AuthData {
    login: string;
    password: string;
}

export interface ValidationErrors {
    login?: string;
    password?: string;
}

export interface AuthFormProps {
    authData: AuthData,
    handlePasswordFieldChange: (payload: string) => void,
    handleLoginFieldChange: (payload: string) => void;
}

export interface UserData {
    token: string;
    login: string;
}

export interface AuthContextType {
    isAuth: boolean;
    isLoadingAuth: boolean;
    userData: UserData | null;
    loginUser: (authData: AuthData) => Promise<any>;
    logoutUser: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface Validation {
    login: string;
    password: string;
}
