import React, {type FC, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useNewEventForm} from '../../hooks/useNewEventForm';
import {ROUTES} from '../../shared/constants/constants';
import {Loader} from '../../shared/loader/Loader';
import {PageTitle} from '../../shared/ui/PageTitle/PageTitle';
import {EventForm} from '../../widgets/EventForm/EventForm';
import styles from './CreateEventPage.module.css';

export const CreateEventPage: FC = () => {

    const nav = useNavigate();
    const {addEvent, isLoading} = useEvent();
    const {
        eventData,
        handleDescriptionChange,
        handleMetadataFieldChange,
        handleBaseFieldChange,
        handleUpdateInteractivePointsBlock,
        handleChangeStatus
    } = useNewEventForm();
    const handleAddEvent = useCallback(() => {
        addEvent(eventData)
            .then(() => {
                console.log('Event added successfully');
                nav(ROUTES.EVENTS_LIST);
            })
            .catch((err) => {
                console.log('Error while fetching addEvent: ', err);
            });
    }, [addEvent, eventData, nav]);

    return (
        <div className={styles.createEventPage}>
            <div className={styles.board}>
                <PageTitle>Создание мероприятия</PageTitle>
                {
                    isLoading ? <Loader/>
                        :
                        <>
                            <EventForm
                                eventData={eventData}
                                handleMetadataFieldChange={handleMetadataFieldChange}
                                handleBaseFieldChange={handleBaseFieldChange}
                                TextAreaChange={handleDescriptionChange}
                                handleChangeStatus={handleChangeStatus}
                                handlePostOrUpdate={handleAddEvent}
                                handleUpdateInteractivePointsBlock={handleUpdateInteractivePointsBlock}
                            />
                        </>
                }
            </div>
        </div>
    );
};
