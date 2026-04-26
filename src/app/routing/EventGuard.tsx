import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useParams} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useEvent} from '../../hooks/useEvent';
import {ROUTES} from '../../shared/constants/constants';
import {Loader} from '../../shared/loader/Loader';

export const EventGuard: React.FC = () => {
    const {eventId} = useParams<{ eventId: string }>();
    const {getEvent} = useEvent();
    const {isAuth, isLoadingAuth} = useAuth();
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!eventId || isLoadingAuth) {
            return;
        }

        setStatus(null);
        setError(false);

        getEvent(eventId)
            .then((event) => {
                setStatus(event.status);
            })
            .catch(() => {
                setError(true);
            });
    }, [eventId, getEvent, isLoadingAuth]);

    if (isLoadingAuth || status === null) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', padding: '2rem'}}>
                <Loader/>
            </div>
        );
    }
    if (error) {
        return <Navigate to="/" replace/>;
    }

    if (status === 'published' || isAuth) {
        return <Outlet/>;
    }

    return <Navigate to={ROUTES.AUTH} replace/>;
};
