import { useCallback, useState, useMemo } from 'react';
import { defaultAuthData } from '../shared/constants/constants';
import { ValidationErrors } from '../shared/types/auth';
import { validateLogin, validatePassword } from '../widgets/AuthForm/validationErrors';

export const useAuthForm = () => {
    const [authData, setAuthData] = useState(defaultAuthData);
    const [touched, setTouched] = useState({
        login: false,
        password: false,
    });
    const [errors, setErrors] = useState<ValidationErrors>({
        login: '',
        password: '',
    });

    // Функции для получения ошибок без установки состояния
    const getLoginError = useCallback((login: string): string => {
        return validateLogin(login);
    }, []);

    const getPasswordError = useCallback((password: string): string => {
        return validatePassword(password);
    }, []);

    // Функция для валидации всей формы
    const validateForm = useCallback((): boolean => {
        const loginError = getLoginError(authData.login);
        const passwordError = getPasswordError(authData.password);

        setTouched({ login: true, password: true });
        setErrors({ login: loginError, password: passwordError });

        return !loginError && !passwordError;
    }, [authData, getLoginError, getPasswordError]);

    const handlePasswordFieldChange = useCallback((payload: string) => {
        setAuthData((prev) => ({
            ...prev,
            password: payload,
        }));

        if (touched.password) {
            const error = getPasswordError(payload);
            setErrors((prev) => ({ ...prev, password: error }));
        }
    }, [touched.password, getPasswordError]);

    const handleLoginFieldChange = useCallback((payload: string) => {
        setAuthData((prev) => ({
            ...prev,
            login: payload,
        }));

        if (touched.login) {
            const error = getLoginError(payload);
            setErrors((prev) => ({ ...prev, login: error }));
        }
    }, [touched.login, getLoginError]);

    const handleBlur = useCallback((field: 'login' | 'password') => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        if (field === 'login') {
            const error = getLoginError(authData.login);
            setErrors((prev) => ({ ...prev, login: error }));
        } else {
            const error = getPasswordError(authData.password);
            setErrors((prev) => ({ ...prev, password: error }));
        }
    }, [authData, getLoginError, getPasswordError]);

    const resetForm = useCallback(() => {
        setAuthData(defaultAuthData);
        setTouched({ login: false, password: false });
        setErrors({ login: '', password: '' });
    }, []);

    const hasErrors = useMemo(() => {
        return !!(errors.login || errors.password);
    }, [errors]);

    return {
        authData,
        errors,
        touched,
        hasErrors,
        getLoginError,
        getPasswordError,
        validateForm,
        handleLoginFieldChange,
        handlePasswordFieldChange,
        handleBlur,
        resetForm,
        setAuthData,
    };
};