import React, {type FC, useCallback} from "react";
import { ArrowLeft , User, LogInIcon} from 'lucide-react';
import {Button} from "../../shared/ui/Button/Button";
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext";

export const Header: FC=()=>{
    const {logoutUser} = useAuth();
    const nav=useNavigate();
    const handleLogout = useCallback(()=>{
        handleLogout();
        nav('/');
    },[])
    return(
        <div className={styles.header}>
            <div className={styles.headerElements}>
                <Button
                    children={<ArrowLeft size={36}/>}
                    className={styles.returnButton}
                    onClick={()=>nav(-1)}
                ></Button>
                <p className={styles.headerText}>T-meeting</p>
                <Button
                    children={<User size={36}/>}
                    className={styles.returnButton}
                    onClick={()=>nav('/personalAccount')}
                ></Button>
                <Button
                    children={<LogInIcon size={36}/>}
                    className={styles.returnButton}
                    onClick={logoutUser}
                ></Button>
            </div>
        </div>
    )
}
