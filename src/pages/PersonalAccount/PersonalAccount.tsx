import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {type FC, useEffect, useState} from "react";
import {AccountService} from "../../app/services/AccountService";
import {useAuth} from "../../contexts/AuthContext";
import {defaultAccountData} from "../../shared/constants/constants";
import styles from "./PersonalAccount.module.css";

export const PersonalAccount: FC = () => {
    const {userData} = useAuth();
    const [AccountData, setAccountData] = useState(defaultAccountData);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadAccountData = async () => {
            if (!userData?.login || !userData?.token) {
                console.log("Нет данных пользователя");
                setIsLoading(false)
                return;
            }
            setIsLoading(true);
            const result = await AccountService.getAccountInfo(userData.login, userData.token);
            if (result.status === "Success") {
                console.log("Account Data loaded");
                if (result.payload.avatarPhoto === undefined) {
                    setAccountData({
                        ...result.payload,
                        avatarPhoto: defaultAccountData.avatarPhoto,
                    });
                } else {
                    setAccountData(result.payload);
                }
            } else {
                console.log(`Error ${result.payload}`);
            }
            setIsLoading(false);
        };
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
                                height: "70px",
                                display: "flex",
                                alignItems: "center",
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
                                label="Логин"
                                value={AccountData.login}
                                variant="standard"
                                sx={{
                                    pointerEvents: "none",
                                }}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />
                            <TextField
                                id="multiline-read-only-input"
                                label="Электронная почта"
                                value={AccountData.email}
                                variant="standard"
                                sx={{
                                    pointerEvents: "none",
                                }}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />
                            <TextField
                                id="multiline-read-only-input"
                                label="Роль"
                                sx={{
                                    pointerEvents: "none",
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
    );
};
