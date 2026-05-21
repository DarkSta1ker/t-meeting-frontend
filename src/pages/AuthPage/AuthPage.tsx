import React, {FC, useState} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useAuthRedirect} from '../../hooks/useAuthRedirect';
import {AuthForm} from '../../widgets/AuthForm/AuthForm';
import styles from './AuthPage.module.css';

export const AuthPage: FC = () => {
    const {isAuth} = useAuth();
    useAuthRedirect(isAuth);
    const [registration, setRegistration] = useState(false);
    const changeForm = () => {
        setRegistration((prev) => !prev);
    };
    const forgetPassword = () => {

    };
    return (
        <div className={styles.formAndButtonBox}>
            <AuthForm registration={registration}/>
            <div className={styles.testCredentials}>
                {/*<div className={styles.links}>*/}
                {/*    <a className={styles.switchLink} onClick={changeForm} role="button">*/}
                {/*        {registration ? 'Авторизация' : 'Регистрация'}*/}
                {/*    </a>*/}
                {/*</div>*/}
                {/*<p>Тестовые учетные записи:</p>*/}
                {/*<p>email1 / password</p>*/}
                {/*<p>email2 / password</p>*/}
            </div>
        </div>
    )
        ;
};
