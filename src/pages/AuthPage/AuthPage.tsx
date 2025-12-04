import React, {FC, useCallback} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {useAuthForm} from "../../hooks/useAuthForm";
import {AuthForm} from "../../widgets/AuthForm/AuthForm";

export const AuthPage: FC = ()=>{
    const nav = useNavigate();
    const {authData, handlePasswordFieldChange, handleLoginFieldChange} = useAuthForm();
    const {loginUser} = useAuth();
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
    return(
        <div>
            <AuthForm
                authData={authData}
                handlePasswordFieldChange={handlePasswordFieldChange}
                handleLoginFieldChange={handleLoginFieldChange}/>
            <Button
                variant="outlined"
                onClick={handleLogin}>
                Отправить
            </Button>
        </div>
    )

}