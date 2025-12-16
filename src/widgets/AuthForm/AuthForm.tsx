import TextField from '@mui/material/TextField';
import React, {FC, useCallback, FormEvent} from 'react';
import styles from "./AuthForm.module.css";
import {Button} from "@mui/material";
import {useAuth} from "../../contexts/AuthContext";
import {useState} from "react";
import {useAuthForm} from "../../hooks/useAuthForm";
import {useNavigate} from "react-router-dom";
import {ValidationErrors} from "../../shared/types/auth";
import {validateLogin,validatePassword} from "./validationErrors";

export const AuthForm: FC = ()=>{
    const nav = useNavigate();
    const {loginUser, isLoadingAuth} = useAuth();
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {authData, handlePasswordFieldChange, handleLoginFieldChange} = useAuthForm();

    const [touched, setTouched] = useState({
        login: false,
        password: false,
    });

    const [errors, setErrors] = useState<ValidationErrors>({
        login:'',
        password:'',
    });

    const handlePasswordChange = (value:string)=>{
        handlePasswordFieldChange(value);
        const error = validatePassword(value);
        setErrors(prev=>({...prev, password:error}));
    }

    const handleLoginChange = (value:string)=>{
        handleLoginFieldChange(value);
        const error = validateLogin(value);
        setErrors(prev=>({...prev, login:error}));
    }

    const handleLogin = useCallback(async(e: FormEvent)=>{
        e.preventDefault()
        const result = await loginUser(authData);
        if(result.status==="Success"){
            setLoginError(false);
            console.log("Авторизация успешна");
            nav('/eventsList');
        }
        else{
            setLoginError(true);
            setErrorMessage(result.payload)
            console.log(`Ошибка ${result.payload}`);
        }
    },[authData, loginUser, nav]);
    const handleBlur = (field: 'login' | 'password') => {
        setTouched(prev => ({ ...prev, [field]: true }));
        if (field === 'login') {
            const error = validateLogin(authData.login);
            setErrors(prev => ({ ...prev, login: error }));

        } else {
            const error = validatePassword(authData.password);
            setErrors(prev => ({ ...prev, password: error }));
        }

    };
    return (
        <form
            className={styles.authForm}
            onSubmit={handleLogin}
            noValidate
        >
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
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !authData.password) {
                        e.preventDefault();
                        document.getElementById('password-input')?.focus();
                    }
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
            />

            <Button
                type="submit"
                variant="outlined"
                disabled={!!errors?.login || !!errors?.password|| isLoadingAuth}
                sx={{
                    backgroundColor: "transparent",
                    borderRadius: '5px',
                    '&:hover': {
                        borderRadius: '5px',
                        backgroundColor: "#cfd0d5",
                    }
                }}
            >
                Войти
            </Button>
            {loginError && <TextField
                error
                id="multiline-read-only-input"
                value={errorMessage}
                variant="standard"
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                }}
            />}
        </form>
    )
}

