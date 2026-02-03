import React, {FC} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useAuthRedirect} from '../../hooks/useAuthRedirect';
import {AuthForm} from '../../widgets/AuthForm/AuthForm';
import styles from './AuthPage.module.css';

export const AuthPage: FC = () => {
    const {isAuth} = useAuth();
    useAuthRedirect(isAuth);

    return (
        <div className={styles.formAndButtonBox}>
            <AuthForm/>
            <div className={styles.testCredentials}>
                <p>Тестовые учетные записи:</p>
                <p>login1 / password</p>
                <p>login2 / password</p>
            </div>
        </div>
    );
};
