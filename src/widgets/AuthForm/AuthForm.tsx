import {Button, TextField} from '@mui/material';
import React, {FC} from 'react';
import {useAuthFormLogic} from '../../hooks/useAuthFormLogic';
import styles from './AuthForm.module.css';

interface AuthFormProps {
    registration: boolean;
}

export const AuthForm: FC<AuthFormProps> = ({registration}) => {
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
        handleReg,
        handleKeyDown,
        clearAuthError
    } = useAuthFormLogic();

    return (
        <form className={styles.authForm} onSubmit={registration ? handleReg : handleAuth} noValidate>
            <TextField
                required
                id="login-input"
                label="Логин"
                variant="outlined"
                value={authData.email}
                onChange={(e) => handleLoginFieldChange(e.target.value)}
                onBlur={() => handleBlur('email')}
                onFocus={clearAuthError}
                error={touched.email && !!errors.email}
                helperText={touched.email ? errors.email : ' '}
                fullWidth
                margin="normal"
                autoComplete="username"
                autoFocus
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                    },
                }}
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
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                    },
                }}
                disabled={isLoadingAuth}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={hasErrors || isLoadingAuth}
                fullWidth
                sx={{
                    marginTop: '20px',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    padding: '10px',

                    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',

                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',

                    '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
                        boxShadow: '0 6px 18px rgba(37, 99, 235, 0.5)',
                    },

                    '&:disabled': {
                        background: '#9ca3af',
                        boxShadow: 'none',
                    },
                }}
            >
                {isLoadingAuth ? (registration ? 'Регистрация' : 'Вход...') :
                    (registration ? 'Зарегистрироваться' : 'Войти')}
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
