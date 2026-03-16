import {useCallback, useState} from 'react';
import {EventService} from '../app/services/EventService';
import {EventListItem} from '../shared/types/event';

export const useEvents = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<EventListItem[]>([]);

    const getAllEvents = useCallback(async () => {
        setIsLoading(true);
        return EventService.getAllEvents()
            .then((res) => {
                setEvents(res);
            })
            .catch((err) => {
                console.log('Error while fetching addEvent: ', err);
                throw err;
            })
            .finally(() => setIsLoading(false));
    }, []);

    return {
        events,
        getAllEvents,
        isLoading,
        setEvents,
        setIsLoading,
    };
};
