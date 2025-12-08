import TextField from '@mui/material/TextField';
import React, {FC} from 'react';
import {AuthFormProps} from "../../shared/types/auth";
import styles from "./AuthForm.module.css";

export const AuthForm: FC<AuthFormProps> = ({authData,handlePasswordFieldChange, handleLoginFieldChange})=>{
    return (
        <div className={styles.authForm}>
            <TextField
                id="outlined-basic"
                label="Логин"
                variant="outlined"
                value={authData.login}
                onChange={(e)=>handleLoginFieldChange(e.target.value)}
            />
            <TextField
                id="outlined-password-input"
                label="Пароль"
                type="password"
                value={authData.password}
                onChange={(e)=>handlePasswordFieldChange(e.target.value)}
                autoComplete="current-password"
            />
        </div>
    )
}