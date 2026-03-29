import {useCallback, useEffect, useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useAuthForm} from './useAuthForm';

export const useAuthFormLogic = () => {
    const {authUser, regUser, isLoadingAuth} = useAuth();
    const [authError, setAuthError] = useState<string | null>(null);
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
    useEffect(() => {
        if (authError) {
            setAuthError('');
        }
    }, [authData.email, authData.password]);

    const handleAuth = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const isValid = validateForm();
            if (!isValid) {
                return;
            }
            authUser(authData)
                .then(() => {
                    console.log('вход типа норм');
                    resetForm();
                })
                .catch((err) => {
                    setAuthError(`Ошибка: ${err}`);
                    console.log(err);
                });
        },
        [authData, authUser, validateForm, resetForm]
    );

    const handleReg = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const isValid = validateForm();
            if (!isValid) {
                return;
            }
            regUser(authData)
                .then(() => {
                    resetForm();
                })
                .catch((err) => {
                    setAuthError(`Ошибка: ${err}`);
                    console.log(err);
                });
        },
        [authData, regUser, validateForm, resetForm]
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
        handleReg,
        handleKeyDown,
        clearAuthError,
    };
};
