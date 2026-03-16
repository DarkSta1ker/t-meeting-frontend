import React, {type FC, useEffect, useState} from 'react';
import {AccountService} from '../../app/services/AccountService';
import {useAuth} from '../../contexts/AuthContext';
import {defaultAccountData} from '../../shared/constants/constants';
import {Loader} from '../../shared/loader/Loader';
import {ReadOnlyTextField} from '../../shared/ui/ReadOnlyTextField/ReadOnlyTextField';
import styles from './PersonalAccount.module.css';

export const PersonalAccount: FC = () => {
    const {userData} = useAuth();
    const [AccountData, setAccountData] = useState(defaultAccountData);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadAccountData = async () => {
            if (!userData?.email || !userData?.role) {
                console.log('Нет данных пользователя');
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            const result = await AccountService.getAccountInfo(userData.email, userData.role);
            if (result.status === 'Success') {
                console.log('Account Data loaded');
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
                        <Loader/>
                    </div>
                    :
                    <div className={styles.personalAccountBox}>
                        <div className={styles.avatarImage}>
                            <img src={AccountData.avatarPhoto}/>
                        </div>
                        <div className={styles.accountInfo}>
                            <ReadOnlyTextField
                                value={AccountData.login}
                                label={'Логин'}
                            />
                            <ReadOnlyTextField
                                value={AccountData.email}
                                label={'Электронная почта'}
                            />
                            <ReadOnlyTextField
                                value={AccountData.role}
                                label={'Роль'}
                            />
                        </div>
                    </div>
            }
        </div>
    );
};
