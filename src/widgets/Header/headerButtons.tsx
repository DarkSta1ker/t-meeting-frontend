import React, {FC} from "react";
import styles from "./Header.module.css";
import {Button} from "../../shared/ui/Button/Button";
import {House} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {LogButton} from "./LogButton";
export const HeaderButtons:  FC=()=>{
    const nav = useNavigate();
    return(
        <div className={styles.headerElements}>
            <Button
                children={<House size={36}/>}
                className={styles.iconButton}
                onClick={()=>nav('/eventsList')}
            ></Button>
            <LogButton />
        </div>
    )
}