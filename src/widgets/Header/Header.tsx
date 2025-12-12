import React, {type FC, useCallback} from "react";
import {User, LogOut, House} from 'lucide-react';
import {Button} from "../../shared/ui/Button/Button";
import styles from './Header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext";
import {HeaderButtons} from "./headerButtons";

export const Header: FC=()=>{
    const nav = useNavigate();
    const {logoutUser, isAuth, userData} = useAuth();
    const location = useLocation();
    const path = location.pathname;
    const handleLogout = useCallback(()=>{
        logoutUser();
        nav('/');
    },[])

    return(
        <div className={styles.header}>
            <div className={styles.headerElementsBlock}>
                <p className={styles.headerText}>T-meeting</p>
                {
                    isAuth?
                        <HeaderButtons/>
                        : null
                }
            </div>

        </div>
    )
}
