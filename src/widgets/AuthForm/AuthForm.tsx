import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthForm } from '../../hooks/useAuthForm';
import styles from './AuthForm.module.css';

export const AuthForm: FC = () => {
    const nav = useNavigate();
    const { authUser, isLoadingAuth } = useAuth();
    const [authError, setAuthError] = useState('');

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
    }, [authData.login, authData.password]);

    const handleAuth = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        const result = await authUser(authData);
        if (result.status === 'Success') {
            console.log('Авторизация успешна');
            resetForm();
            nav('/eventsList');
        } else {
            setAuthError(result.payload);
            console.log(`Ошибка ${result.payload}`);
        }
    }, [
        authData,
        authUser,
        nav,
        validateForm,
        resetForm
    ]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent, nextFieldId?: string) => {
        if (e.key === 'Enter' && nextFieldId) {
            e.preventDefault();
            document.getElementById(nextFieldId)?.focus();
        }
    }, []);

    const clearError = useCallback(() => {
        if (authError) {
            setAuthError('');
        }
    }, [authError]);

    return (
        <form
            className={styles.authForm}
            onSubmit={handleAuth}
            noValidate
        >
            <TextField
                required
                id='login-input'
                label='Логин'
                variant='outlined'
                value={authData.login}
                onChange={(e) => handleLoginFieldChange(e.target.value)}
                onBlur={() => handleBlur('login')}
                onFocus={clearError}
                error={touched.login && !!errors.login}
                helperText={touched.login ? errors.login : ' '}
                fullWidth
                margin='normal'
                autoComplete='username'
                autoFocus
                onKeyDown={(e) => handleKeyDown(e, 'password-input')}
                disabled={isLoadingAuth}
            />

            <TextField
                required
                id='password-input'
                label='Пароль'
                type='password'
                value={authData.password}
                onChange={(e) => handlePasswordFieldChange(e.target.value)}
                onBlur={() => handleBlur('password')}
                onFocus={clearError}
                error={touched.password && !!errors.password}
                helperText={touched.password ? errors.password : ' '}
                fullWidth
                margin='normal'
                autoComplete='current-password'
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !hasErrors) {
                        handleAuth(e);
                    }
                }}
                disabled={isLoadingAuth}
            />

            <Button
                type='submit'
                variant='outlined'
                disabled={hasErrors || isLoadingAuth}
                sx={{
                    '&:hover:not(:disabled)': {
                        backgroundColor: '#cfd0d5',
                        borderRadius: '5px',
                    },
                    'backgroundColor': 'transparent',
                    'borderRadius': '5px',
                    'marginTop': '16px',
                }}
                fullWidth
            >
                {isLoadingAuth ? 'Вход...' : 'Войти'}
            </Button>

            {authError && (
                <div className={styles.errorContainer}>
                    <TextField
                        error
                        value={authError}
                        variant='standard'
                        sx={{
                            'width': '100%',
                            'marginTop': '16px',
                            '& .MuiInputBase-root': {
                                justifyContent: 'center',
                                textAlign: 'center',
                            },
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                            },
                        }}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </div>
            )}
        </form>
    );
};
