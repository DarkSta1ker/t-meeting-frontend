import React, {type FC} from "react";
import styles from './Header.module.css';
import {useAuth} from "../../contexts/AuthContext";
import {HeaderButtons} from "./headerButtons";
import Typography from '@mui/material/Typography'
export const Header: FC=()=>{
    const {isAuth} = useAuth();

    return(
        <div className={styles.header}>
            <div className={styles.headerElementsBlock}>
                <Typography variant="h5">T-meeting</Typography>
                {
                    isAuth?
                        <HeaderButtons/>
                        : null
                }
            </div>
        </div>
    )
}
