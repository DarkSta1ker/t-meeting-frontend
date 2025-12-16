import React, {type FC} from "react";
import styles from './Header.module.css';
import {useAuth} from "../../contexts/AuthContext";
import Typography from '@mui/material/Typography'
import {useNavigate} from "react-router-dom";
import {LogButtons} from "./LogButtons";

export const Header: FC=()=>{
    const {isAuth} = useAuth();
    const nav = useNavigate();
    const handleLogoClick = () => {
        nav('/eventsList');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return(
        <div className={styles.header}>
            <div className={styles.headerElementsBlock}>
                {
                    isAuth?
                        <>
                            <Typography
                                variant="h5"
                                onClick={handleLogoClick}
                                sx={{
                                    '&:hover': {
                                        cursor:"pointer"
                                    }
                                }}
                            >T-meeting</Typography>
                            <LogButtons/>
                        </>
                        :
                        <Typography
                            variant="h5"
                        >T-meeting</Typography>
                }
            </div>
        </div>
    )
}
