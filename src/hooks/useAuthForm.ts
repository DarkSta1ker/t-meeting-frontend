import {useCallback, useState} from 'react';
import {defaultAuthData} from '../shared/constants/constants';

export const useAuthForm = () => {

    const [authData, setAuthData] = useState(defaultAuthData);
    const handlePasswordFieldChange = useCallback((payload: string) => {
        setAuthData((prev) => ({
            ...prev,
            password: payload,
        }));
    }, [setAuthData]);

    const handleLoginFieldChange = useCallback((payload: string) => {
        setAuthData((prev) => ({
            ...prev,
            login: payload,
        }));
    }, [setAuthData]);

    return{
        authData,
        handleLoginFieldChange,
        handlePasswordFieldChange,
    };
};
