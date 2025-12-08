import React, {type FC, useCallback} from "react";
import { ArrowLeft , User, LogOut, House} from 'lucide-react';
import {Button} from "../../shared/ui/Button/Button";
import styles from './Header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext";

export const Header: FC=()=>{
    const {logoutUser, isAuth, userData} = useAuth();
    const nav=useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const handleLogout = useCallback(()=>{
        logoutUser();
        nav('/');
    },[])
    let workPage = false;
    let accountPage = false;
    let authPage = false;
    if(path==='/personalAccount'){
        accountPage = true
    }
    else if(path==='/'){
        authPage = true
    }
    else{
        workPage=true;
    }
    let accountButtonChildren = (
        <div className={styles.accountButtonChildrenBox}>
            <p className={styles.email}>{userData?.email}</p>
            <User size={36}/>
        </div>
    );
    return(
        <div className={styles.header}>
            <div className={styles.headerElementsBlock}>
                {
                    workPage && (
                        <div className={styles.headerElements}>
                            <Button
                                children={<House size={36}/>}
                                className={styles.iconButton}
                                onClick={()=>nav('/eventsList')}
                            ></Button>
                            <p className={styles.headerText}>T-meeting</p>
                            <Button
                                children={accountButtonChildren}
                                className={styles.avatarButton}
                                onClick={()=>nav('/personalAccount')}
                            ></Button>
                        </div>
                    )
                }
                {
                    accountPage && (
                        <div className={styles.headerElements}>
                            <Button
                                children={<House size={36}/>}
                                className={styles.iconButton}
                                onClick={()=>nav('/eventsList')}
                            ></Button>
                            <p className={styles.headerText}>T-meeting</p>
                            <Button
                                children={<LogOut size={36}/>}
                                className={styles.iconButton}
                                onClick={handleLogout}
                            ></Button>
                        </div>
                    )
                }
                {
                    !isAuth && (
                        <p className={styles.headerText}>T-meeting</p>
                    )
                }
            </div>
        </div>
    )
}
