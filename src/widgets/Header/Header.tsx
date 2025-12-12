import React, {type FC, useCallback} from "react";
import {User, LogOut, House} from 'lucide-react';
import {Button} from "../../shared/ui/Button/Button";
import styles from './Header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext";

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
                        <div className={styles.headerElements}>
                            <Button
                                children={<House size={36}/>}
                                className={styles.iconButton}
                                onClick={()=>nav('/eventsList')}
                            ></Button>
                            {
                                (path==='/personalAccount')?
                                    <Button
                                        children={<LogOut size={36}/>}
                                        className={styles.avatarButton}
                                        onClick={handleLogout}
                                    />
                                    :
                                    <Button
                                        className={styles.avatarButton}
                                        onClick={()=>nav('/personalAccount')}
                                    >
                                        <div className={styles.accountButtonChildrenBox}>
                                            <p className={styles.email}>{userData?.email}</p>
                                            <User size={36}/>
                                        </div>
                                    </Button>
                            }

                        </div>
                        : null
                }
            </div>

        </div>
    )
}
