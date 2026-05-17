import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useParams} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useEvent} from '../../hooks/useEvent';
import {ROUTES} from '../../shared/constants/constants';
import {Loader} from '../../shared/loader/Loader';
import styles from './EventGuard.module.css';

export const EventGuard: React.FC = () => {
    const {eventId} = useParams<{ eventId: string }>();
    const {getPublishedEvent} = useEvent();
    const {isAuth, isLoadingAuth, isAuthChecking} = useAuth();
    const [status, setStatus] = useState<number | null>(null);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (!eventId || isLoadingAuth) {
            return;
        }

        setStatus(null);
        setError(false);

        getPublishedEvent(eventId)
            .then(() => {
                setStatus(200);
            })
            .catch((e) => {
                setStatus(e.status);
                setError(true);
            });
    }, [eventId, getPublishedEvent, isLoadingAuth]);

    if (isAuthChecking || status === null) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', padding: '2rem'}}>
                <Loader/>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.section}>
                <div className={styles.text}>
                    {
                        status === 404 ?
                            'Мероприятие с таким id не существует, либо оно не является опубликованным.'
                            :
                            'Предоставлен некорректный id. Возможно вы скопировали ссылку не полностью.'
                    }
                </div>
                <div className={styles.text}>
                    {
                        'Пожалуйста, свяжитесь с тем, кто предоставил вам ссылку для получения помощи.\nС уважением, команда T-meeting!'
                    }
                </div>
                <div className={styles.imageSection}>
                    <img src={process.env.PUBLIC_URL + '/fullLogo.png'}/>
                </div>
            </div>
        );
    }

    if (status === 200 || isAuth) {
        return <Outlet/>;
    }

    return <Navigate to={ROUTES.AUTH} replace/>;
};
