import React, {type FC, useEffect, useState} from "react";
import styles from "./PersonalAccount.module.css";
import {TextField} from "@mui/material";
import {defaultAccountData} from "../../shared/constants/constants";
import {AccountService} from "../../app/services/AccountService";
import {useAuth} from "../../contexts/AuthContext";
import Typography from "@mui/material/Typography";

export const PersonalAccount: FC = () => {
    const {userData} = useAuth();
    const [AccountData, setAccountData] = useState(defaultAccountData);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const loadAccountData = async () => {
            if (!userData?.email || !userData?.token) {
                console.log('Нет данных пользователя');
                setIsLoading(false)
                return;
            }
            setIsLoading(true)
            const result = await AccountService.getAccountInfo(userData.email, userData.token);
            if (result.status === "Success") {
                console.log("Account Data loaded");
                if(result.payload.avatarPhoto===undefined){
                    setAccountData({
                        ...result.payload,
                        avatarPhoto: defaultAccountData.avatarPhoto,
                    })
                }
                else{
                    setAccountData(result.payload);
                }
            } else {
                console.log(`Error ${result.payload}`);
            }
            setIsLoading(false)
        }
        loadAccountData();
    }, []);

    return (
        <div className={styles.personalAccount}>
            {
                isLoading ?
                    <div className={styles.loading}>
                        <Typography
                            variant="h4"
                            sx={{
                                height:'70px',
                                display:'flex',
                                alignItems: 'center',
                            }}
                        >
                            Загрузка...
                        </Typography>
                    </div>
                    :
                    <div className={styles.personalAccountBox}>
                        <div className={styles.avatarImage}>
                            <img src={AccountData.avatarPhoto}/>
                        </div>
                        <div className={styles.accountInfo}>
                            <TextField
                                id="multiline-read-only-input"
                                label="Login"
                                value={AccountData.login}
                                variant="standard"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />
                            <TextField
                                id="multiline-read-only-input"
                                label="Email"
                                value={AccountData.email}
                                variant="standard"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />
                            <TextField
                                id="multiline-read-only-input"
                                label="Role"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                value={AccountData.role}
                                variant="standard"
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}