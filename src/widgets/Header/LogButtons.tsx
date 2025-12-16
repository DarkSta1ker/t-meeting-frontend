import React, {FC, useCallback} from "react";
import {LogOut, User} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./Header.module.css";
export const LogButtons: FC=() => {
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

    const isPersonalAccountPage = path === '/personalAccount';

    const getContent= ()=>{
        return isPersonalAccountPage?
            null
            :
            <Button
                onClick={handleNavigateAccount}
                sx={{
                    backgroundColor: "transparent",
                    borderRadius: '25px',
                    color: '#757575',
                    '&:hover': {
                        borderRadius: '25px',
                        backgroundColor: "#cfd0d5",
                    }
                }}
            >
                <Typography variant="button">{userData?.login}</Typography>
                <User size={36}/>
            </Button>

    }


    return (
        <div className={styles.headerElements}>
            {getContent()}
            <Button
                onClick={handleLogout}
                sx={{
                    backgroundColor: "transparent",
                    borderRadius: '25px',
                    color: '#757575',
                    '&:hover': {
                        borderRadius: '25px',
                        backgroundColor: "#cfd0d5",
                    }
                }}
            >
                <LogOut size={36}/>
            </Button>
        </div>
    )
}