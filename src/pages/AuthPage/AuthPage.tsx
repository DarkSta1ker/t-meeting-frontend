import React, {FC, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {AuthForm} from '../../widgets/AuthForm/AuthForm';
import styles from './AuthPage.module.css';

export const AuthPage: FC = () => {
    const nav = useNavigate();
    const {isAuth} = useAuth();
    useEffect(() => {
        if (isAuth) {
            nav('/eventsList');
        }
    }, [isAuth, nav]);
    return(
        <div className={styles.formAndButtonBox}>
            <AuthForm/>
            <div>
                <p>
                    login1 password
                </p>
                <p>
                    login2 password
                </p>
            </div>
        </div>
    );
};
