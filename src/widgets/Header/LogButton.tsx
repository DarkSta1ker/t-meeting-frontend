import React, {FC, useCallback} from "react";
import {Button} from "../../shared/ui/Button/Button";
import {LogOut, User} from "lucide-react";
import styles from "./Header.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

export const LogButton: FC=() => {
    const nav = useNavigate();
    const location = useLocation();
    const path= location.pathname;
    const {logoutUser, userData} = useAuth();
    const handleLogout = useCallback(()=>{
        logoutUser();
        nav('/');
    },[])
    const handleNavigateAccount = useCallback(()=>{
        nav('/personalAccount');
    },[])

    const isPersonalAccountPage = location.pathname === '/personalAccount'? true : false;

    const handleClick = isPersonalAccountPage? handleLogout: handleNavigateAccount;

    const getButtonContent= ()=>{
        return isPersonalAccountPage?
            <LogOut size={36}/>
            :
            <div className={styles.accountButtonChildrenBox}>
                <p className={styles.email}>{userData?.email}</p>
                <User size={36}/>
            </div>
    }

    return (
        <Button
            className={styles.avatarButton}
            onClick={handleClick}
        >
            {getButtonContent()}
        </Button>
    )
}