import {Button, TextField} from '@mui/material';
import React, {FC} from 'react';
import {useAuthFormLogic} from '../../hooks/useAuthFormLogic';
import styles from './AuthForm.module.css';

export const AuthForm: FC = () => {
    const {
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
        clearAuthError
    } = useAuthFormLogic();

    return (
        <form className={styles.authForm} onSubmit={handleAuth} noValidate>
            <TextField
                required
                id="login-input"
                label="Логин"
                variant="outlined"
                value={authData.login}
                onChange={(e) => handleLoginFieldChange(e.target.value)}
                onBlur={() => handleBlur('login')}
                onFocus={clearAuthError}
                error={touched.login && !!errors.login}
                helperText={touched.login ? errors.login : ' '}
                fullWidth
                margin="normal"
                autoComplete="username"
                autoFocus
                onKeyDown={(e) => handleKeyDown(e, 'password-input')}
                disabled={isLoadingAuth}
            />

            <TextField
                required
                id="password-input"
                label="Пароль"
                type="password"
                value={authData.password}
                onChange={(e) => handlePasswordFieldChange(e.target.value)}
                onBlur={() => handleBlur('password')}
                onFocus={clearAuthError}
                error={touched.password && !!errors.password}
                helperText={touched.password ? errors.password : ' '}
                fullWidth
                margin="normal"
                autoComplete="current-password"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !hasErrors) {
                        handleAuth(e);
                    }
                }}
                disabled={isLoadingAuth}
            />

            <Button
                type="submit"
                variant="outlined"
                disabled={hasErrors || isLoadingAuth}
                sx={{
                    '&:hover:not(:disabled)': {
                        backgroundColor: '#cfd0d5',
                        borderRadius: '5px',
                    },
                    backgroundColor: 'transparent',
                    borderRadius: '5px',
                    marginTop: '16px',
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
                        variant="standard"
                        sx={{
                            width: '100%',
                            marginTop: '16px',
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
