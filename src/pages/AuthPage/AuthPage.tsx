import React, {FC, useCallback, useEffect} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {useAuthForm} from "../../hooks/useAuthForm";
import {AuthForm} from "../../widgets/AuthForm/AuthForm";
import styles from "./AuthPage.module.css"

export const AuthPage: FC = ()=>{
    const nav = useNavigate();
    const {authData, handlePasswordFieldChange, handleLoginFieldChange} = useAuthForm();
    const {loginUser, isAuth} = useAuth();
    const handleLogin = useCallback(async()=>{
        const result = await loginUser(authData);
        if(result.status==="Success"){
            console.log("Авторизация успешна");
            nav('/eventsList');
        }
        else{
            console.log(`Ошибка ${result.payload}`);
        }
    },[authData, loginUser]);

    useEffect(() => {
        if(isAuth){
            nav('/eventsList');
        }
    }, [isAuth, nav]);

    return(
        <div className={styles.formAndButtonBox}>
            <AuthForm
                authData={authData}
                handlePasswordFieldChange={handlePasswordFieldChange}
                handleLoginFieldChange={handleLoginFieldChange}/>
            <Button
                variant="outlined"
                onClick={handleLogin}>
                Войти
            </Button>
        </div>
    )

}