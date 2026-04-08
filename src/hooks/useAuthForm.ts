import {useCallback, useState} from 'react';
import {AuthData} from '../shared/types/auth';
import {validateLogin, validatePassword} from '../widgets/AuthForm/validationErrors';

export const useAuthForm = () => {
    const [authData, setAuthData] = useState<AuthData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof AuthData, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof AuthData, boolean>>>({});

    const validateField = useCallback((field: keyof AuthData, value: string): string => {
        if (field === 'email') {
            return validateLogin(value);
        } else {
            return validatePassword(value);
        }
    }, []);

    const handleLoginFieldChange = useCallback((value: string) => {
        setAuthData(prev => ({...prev, email: value}));

        if (touched.email) {
            const error = validateField('email', value);
            setErrors(prev => ({...prev, email: error}));
        }
    }, [touched.email, validateField]);

    const handlePasswordFieldChange = useCallback((value: string) => {
        setAuthData(prev => ({...prev, password: value}));

        if (touched.password) {
            const error = validateField('password', value);
            setErrors(prev => ({...prev, password: error}));
        }
    }, [touched.password, validateField]);

    const handleBlur = useCallback((field: keyof AuthData) => {
        setTouched(prev => ({...prev, [field]: true}));

        const error = validateField(field, authData[field]);
        setErrors(prev => ({...prev, [field]: error}));
    }, [authData, validateField]);

    const validateForm = useCallback((): boolean => {
        const newErrors = {
            login: validateField('email', authData.email),
            password: validateField('password', authData.password),
        };

        setErrors(newErrors);
        setTouched({email: true, password: true});

        return !newErrors.login && !newErrors.password;
    }, [authData, validateField]);

    const resetForm = useCallback(() => {
        setAuthData({email: '', password: ''});
        setErrors({});
        setTouched({});
    }, []);

    const hasErrors = !!errors.email || !!errors.password;

    return {
        authData,
        errors,
        touched,
        hasErrors,
        validateForm,
        handleLoginFieldChange,
        handlePasswordFieldChange,
        handleBlur,
        resetForm,
    };
};
