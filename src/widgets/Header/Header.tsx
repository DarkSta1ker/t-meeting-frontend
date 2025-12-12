import React, {type FC} from "react";
import styles from './Header.module.css';
import {useAuth} from "../../contexts/AuthContext";
import {HeaderButtons} from "./headerButtons";

export const Header: FC=()=>{
    const {isAuth} = useAuth();

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
