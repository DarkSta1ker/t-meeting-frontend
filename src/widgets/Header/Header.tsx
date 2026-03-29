import React, {type FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import styles from './Header.module.css';
import {LogButtons} from './LogButtons';

export const Header: FC = () => {
    const {isAuth} = useAuth();
    const nav = useNavigate();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogoClick = () => {
        nav('/eventsList');
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.inner}>
                <div className={styles.logo} onClick={handleLogoClick}>
                    T-meeting
                </div>

                {isAuth && <LogButtons/>}
            </div>
        </div>
    );
};
