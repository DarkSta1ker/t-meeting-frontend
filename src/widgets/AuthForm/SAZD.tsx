import TextField from '@mui/material/TextField';
import React, {FC, useState, useEffect, useCallback} from 'react';
import {AuthFormProps} from "../../shared/types/auth";
import styles from "./AuthForm.module.css";
import {ValidationErrors} from "../../shared/types/auth";

export const AuthF: FC<AuthFormProps> = ({
                                                authData,
                                                handlePasswordFieldChange,
                                                handleLoginFieldChange,
                                            }) => {
    const [touched, setTouched] = useState({
        login: false,
        password: false
    });

    const [errors, setErrors] = useState<ValidationErrors>({
        login: "",
        password:""
    })
    // Валидация логина
    const validateLogin = (login: string) => {
        if (!login.trim()) return 'Логин обязателен';
        if (login.length < 3) return 'Логин должен быть не менее 3 символов';
        if (login.length > 50) return 'Логин должен быть не более 50 символов';
        if (!/^[a-zA-Z0-9_-]+$/.test(login)) {
            return 'Логин может содержать только буквы, цифры, дефис и подчеркивание';
        }
        return '';
    };

    // Валидация пароля
    const validatePassword = (password: string) => {
        if (!password) return 'Пароль обязателен';
        if (password.length < 6) return 'Пароль должен быть не менее 6 символов';
        if (password.length > 50) return 'Пароль должен быть не более 50 символов';
        if (/\s/.test(password)) return 'Пароль не должен содержать пробелы';
        return '';
    };

    // Обработчик изменения логина
    const handleLoginChange = (value: string) => {
        handleLoginFieldChange(value);
        if (touched.login) {
            const error = validateLogin(value);
            setErrors(prev => ({ ...prev, login: error }));
        }
    };

    // Обработчик изменения пароля
    const handlePasswordChange = (value: string) => {
        handlePasswordFieldChange(value);
        if (touched.password) {
            const error = validatePassword(value);
            setErrors(prev => ({ ...prev, password: error }));
        }
    };

    // Обработчик потери фокуса
    const handleBlur = (field: 'login' | 'password') => {
        setTouched(prev => ({ ...prev, [field]: true }));

        if (field === 'login') {
            const error = validateLogin(authData.login);
            setErrors(prev => ({ ...prev, login: error }));

        } else {
            const error = validatePassword(authData.password);
            setErrors(prev => ({ ...prev, password: error }));
        }
        setTouched(prev => ({ ...prev, [field]: false }));
    };

    return (
        <div className={styles.authForm}>
            <TextField
                required
                id="login-input"
                label="Логин"
                variant="outlined"
                value={authData.login}
                onChange={(e) => handleLoginChange(e.target.value)}
                onBlur={() => handleBlur('login')}
                error={touched.login && !!errors?.login}
                helperText={touched.login && errors?.login}
                fullWidth
                margin="normal"
                autoComplete="username"
                inputProps={{
                    maxLength: 50
                }}
            />
            <TextField
                required
                id="password-input"
                label="Пароль"
                type="password"
                value={authData.password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={() => handleBlur('password')}
                error={touched.password && !!errors?.password}
                helperText={touched.password && errors?.password}
                fullWidth
                margin="normal"
                autoComplete="current-password"
                inputProps={{
                    maxLength: 50
                }}
            />
        </div>
    );
};