import React, {FC} from "react";
import styles from "./Header.module.css";
import {Button} from "../../shared/ui/Button/Button";
import {House} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {LogButton} from "./LogButton";
import IconButton from "@mui/material/IconButton"
export const HeaderButtons:  FC=()=>{
    const nav = useNavigate();
    return(
        <div className={styles.headerElements}>
            <IconButton onClick={()=>nav('/eventsList')}
            sx={{
                backgroundColor: "transparent",
                color: "#757575",
                '&:hover': {
                    borderRadius: '25px',
                    backgroundColor: "#cfd0d5",
                }
            }}
            >
                <House size={36}/>
            </IconButton>
            <LogButton />
        </div>
    )
}