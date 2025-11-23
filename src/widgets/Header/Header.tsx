import React , {type FC} from "react";
import { ArrowLeft , User} from 'lucide-react';
import {Button} from "../../shared/ui/Button/Button";
import styles from './Header.module.css';
interface HeaderProps {
    button1?: ()=> void
    button2?: ()=> void
}
export const Header: FC<HeaderProps>=({button1, button2})=>{
    return(
        <div className={styles.header}>
            <div className={styles.headerElements}>
                <Button
                    children={<ArrowLeft size={36}/>}
                    className={styles.returnButton}
                    onClick={button1}
                ></Button>
                <p className={styles.headerText}>T-meeting</p>
                <Button
                    children={<User size={36}/>}
                    className={styles.returnButton}
                    onClick={button2}
                ></Button>
            </div>
        </div>
    )
}
