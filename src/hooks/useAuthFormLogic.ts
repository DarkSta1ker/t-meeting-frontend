import {useCallback, useEffect, useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useAuthForm} from './useAuthForm';

export const useAuthFormLogic = () => {
    const {authUser, isLoadingAuth} = useAuth();
    const {
        authData,
        errors,
        touched,
        hasErrors,
        validateForm,
        handleLoginFieldChange,
        handlePasswordFieldChange,
        handleBlur,
        resetForm,
    } = useAuthForm();
    const [authError, setAuthError] = useState<string | null>(null);
    useEffect(() => {
        if (authError) {
            setAuthError('');
        }
    }, [authData.login, authData.password]);

    const handleAuth = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            const isValid = validateForm();
            if (!isValid) {
                return;
            }

            const result = await authUser(authData);
            if (result.status === 'Success') {
                resetForm();
            } else {
                setAuthError(result.payload);
                console.log(result.payload);
            }
        },
        [authData, authUser, validateForm, resetForm]
    );

    const handleKeyDown = useCallback((e: React.KeyboardEvent, nextFieldId?: string) => {
        if (e.key === 'Enter' && nextFieldId) {
            e.preventDefault();
            document.getElementById(nextFieldId)?.focus();
        }
    }, []);
    const clearAuthError = useCallback(() => {
        if (authError) {
            setAuthError('');
        }
    }, [authError]);
    return {
        authData,
        errors,
        touched,
        hasErrors,
        isLoadingAuth,
        authError,
        handleLoginFieldChange,
        handlePasswordFieldChange,
        handleBlur,
        handleAuth,
        handleKeyDown,
        clearAuthError,
    };
};
