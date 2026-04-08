import {LogOut, User} from 'lucide-react';
import React, {FC} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import styles from './Header.module.css';

export const LogButtons: FC = () => {
    const nav = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const {logoutUser, userData} = useAuth();

    const isPersonalAccountPage = path === '/personalAccount';

    return (
        <div className={styles.headerElements}>
            {!isPersonalAccountPage && (
                <button
                    className={styles.userButton}
                    onClick={() => nav('/personalAccount')}
                >
                    <User size={20}/>
                    <span>{userData?.email}</span>
                </button>
            )}

            <button
                className={styles.logoutButton}
                onClick={() => {
                    logoutUser();
                    nav('/');
                }}
            >
                <LogOut size={20}/>
            </button>
        </div>
    );
};
