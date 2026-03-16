import {useCallback} from 'react';
import {EventService} from '../app/services/EventService';
import {EventListItem, EventNew} from '../shared/types/event';
import {useEvents} from './useEvents';
//TODO много повторяющегося кода
export const useEvent = () => {
    const {isLoading, setIsLoading} = useEvents();
    const addEvent = useCallback(async (event: EventNew) => {
        setIsLoading(true);
        return EventService.addEvent(event)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log('Error while fetching addEvent: ', err);
                throw err;
            })
            .finally(() => setIsLoading(false));
    }, [setIsLoading]);

    const getEvent = useCallback(async (eventId: string) => {
        setIsLoading(true);
        return EventService.getEvent(eventId)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log('Error while fetching addEvent: ', err);
                throw err;
            })
            .finally(() => setIsLoading(false));
    }, [setIsLoading]);

    const deleteEvent = useCallback(async (eventId: string) => {
        setIsLoading(true);
        return EventService.deleteEvent(eventId)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log('Error while fetching addEvent: ', err);
                throw err;
            })
            .finally(() => setIsLoading(false));
    }, [setIsLoading]);

    const updateEvent = useCallback(async (event: EventListItem) => {
        setIsLoading(true);
        return EventService.updateEvent(event)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log('Error while fetching addEvent: ', err);
                throw err;
            })
            .finally(() => setIsLoading(false));
    }, [setIsLoading]);

    return {
        addEvent,
        getEvent,
        deleteEvent,
        updateEvent,
        isLoading
    };
};
