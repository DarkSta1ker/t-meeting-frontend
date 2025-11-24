import React , {type FC} from "react";
import { ArrowLeft , User} from 'lucide-react';
import {Button} from "../../shared/ui/Button/Button";
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
export const Header: FC=()=>{
    const nav=useNavigate();
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
            </div>
        </div>
    )
}
