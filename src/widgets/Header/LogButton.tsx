import React, {FC, useCallback} from "react";
import {LogOut, User} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export const LogButton: FC=() => {
    const nav = useNavigate();
    const location = useLocation();
    const path= location.pathname;
    const {logoutUser, userData} = useAuth();
    const handleLogout = useCallback(()=>{
        logoutUser();
        nav('/');
    },[])
    const handleNavigateAccount = useCallback(()=>{
        nav('/personalAccount');
    },[])

    const isPersonalAccountPage = path === '/personalAccount';

    const handleClick = isPersonalAccountPage? handleLogout: handleNavigateAccount;

    const getButtonContent= ()=>{
        return isPersonalAccountPage?
            <LogOut size={36}/>
            :
            <>
                <Typography variant="button">{userData?.email}</Typography>
                <User size={36}/>
            </>

    }

    return (
        <Button
            onClick={handleClick}
            sx={{
                backgroundColor: "transparent",
                borderRadius: '25px',
                color: '#757575',
                '&:hover': {
                    borderRadius: '25px',
                    backgroundColor: "#cfd0d5",
                }
            }}
        >
            {getButtonContent()}
        </Button>
    )
}