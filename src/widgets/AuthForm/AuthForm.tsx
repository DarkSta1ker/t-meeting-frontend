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
            <div style={{marginBottom: '16px'}}>
                <h2 style={{
                    margin: 0,
                    fontSize: '22px',
                    fontWeight: 700
                }}>
                    {registration ? 'Регистрация' : 'Вход'}
                </h2>
            </div>
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
                        borderRadius: '12px',
                        backgroundColor: '#F6F7F8',
                        color: '#1f1f1f',

                        '& fieldset': {
                            borderColor: 'transparent',
                        },

                        '&:hover fieldset': {
                            borderColor: '#e5e7eb',
                        },

                        '&.Mui-focused fieldset': {
                            borderColor: '#FFDD2D',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#6b7280',
                    },

                    '& .MuiInputLabel-root.Mui-focused': {
                        fontWeight: '500',
                        color: '#000000',
                    },

                    '& .MuiInputBase-input': {
                        color: '#1f1f1f',
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
                        borderRadius: '12px',
                        backgroundColor: '#F6F7F8',
                        color: '#1f1f1f',

                        '& fieldset': {
                            borderColor: 'transparent',
                        },

                        '&:hover fieldset': {
                            borderColor: '#e5e7eb',
                        },

                        '&.Mui-focused fieldset': {
                            borderColor: '#FFDD2D',
                        },
                    },

                    '& .MuiInputLabel-root': {
                        color: '#6b7280',
                    },

                    '& .MuiInputLabel-root.Mui-focused': {
                        fontWeight: '500',
                        color: '#000000',
                    },

                    '& .MuiInputBase-input': {
                        color: '#1f1f1f',
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
                    marginTop: '24px',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    padding: '12px',

                    backgroundColor: '#FFDD2D',
                    color: '#000',

                    boxShadow: 'none',

                    '&:hover': {
                        backgroundColor: '#ffd500',
                        boxShadow: '0 6px 16px rgba(255, 221, 45, 0.4)',
                    },

                    '&:active': {
                        transform: 'scale(0.98)',
                    },

                    '&:disabled': {
                        background: '#E5E7EB',
                        color: '#9CA3AF',
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
