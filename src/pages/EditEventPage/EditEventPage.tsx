import React, {type FC, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useEvent} from '../../hooks/useEvent';
import {useEventForm} from '../../hooks/useEventForm';
import {ROUTES} from '../../shared/constants/constants';
import {Loader} from '../../shared/loader/Loader';
import {PageTitle} from '../../shared/ui/PageTitle/PageTitle';
import {EventForm} from '../../widgets/EventForm/EventForm';
import styles from './EditEventPage.module.css';

export const EditEventPage: FC = () => {
    const nav = useNavigate();
    const {eventId} = useParams<{ eventId: string }>();
    const {updateEvent, isLoading} = useEvent();
    const {
        eventData,
        handleDesriptionChange,
        handleMetadataFieldChange,
        handleBaseFieldChange,
        handleUpdateTimeLine,
        handleChangeStatus,
        handleUpdateMapBlock
    } = useEventForm(eventId);
    const handleUpdateEvent = useCallback(() => {
        updateEvent(eventData)
            .then(() => {
                console.log('Event updated');
                nav(ROUTES.EVENTS_LIST);
            })
            .catch((err) => {
                console.log('Error while fetching addEvent: ', err);
            });
    }, [updateEvent, eventData, nav]);

    return (
        <div className={styles.editEventPage}>
            <div className={styles.board}>
                <PageTitle>Редактирование мероприятия</PageTitle>
                {
                    isLoading ? <Loader/> :
                        <EventForm
                            eventData={eventData}
                            handleMetadataFieldChange={handleMetadataFieldChange}
                            handleBaseFieldChange={handleBaseFieldChange}
                            TextAreaChange={handleDesriptionChange}
                            handleUpdateTimeLine={handleUpdateTimeLine}
                            handleChangeStatus={handleChangeStatus}
                            handlePostOrUpdate={handleUpdateEvent}
                            handleUpdateMapBlock={handleUpdateMapBlock}
                        />
                }
            </div>
        </div>
    );
};
