import {useCallback, useEffect, useState} from 'react';
import {defaultEditEvent,} from '../shared/constants/constants';
import {EventBaseField, EventMetadataField,} from '../shared/types/event';
import {useEvent} from './useEvent';

export const useEventForm = (eventId?: string) => {
    const {getEvent} = useEvent();
    const [eventData, setEventData] = useState(defaultEditEvent);
    useEffect(() => {
        if (!eventId) {
            setEventData(defaultEditEvent);
            return;
        }
        const loadEvent = async () => {
            const result = await getEvent(eventId);
            if (result.status === 'Success') {
                console.log('Event loaded');
                setEventData(result.payload);
            } else {
                console.log(`Error ${result.payload}`);
            }
        };
        loadEvent();
    }, [eventId, getEvent]);

    const handleBaseFieldChange = useCallback((field: EventBaseField, value: string) => {
        setEventData((prev) => ({
            ...prev,
            [field]: value
        }));
    }, [setEventData]);

    const handleMetadataFieldChange = useCallback((field: EventMetadataField, value: string) => {
        setEventData((prev) => ({
            ...prev,
            metadata: {
                ...prev.metadata,
                [field]: value
            }
        }));
    }, [setEventData]);

    const handleDesriptionChange = useCallback((value: string) => {
        setEventData((prev) => {
            const content = prev.content.map((contentBlock) => contentBlock.block === 'promo-text' ? {
                ...contentBlock,
                payload: [value]
            } : contentBlock);

            return ({
                ...prev,
                content,
            });
        });
    }, [setEventData]);

    const resetForm = useCallback(() => {
        setEventData(defaultEditEvent);
    }, []);

    const handleChangeStatus = useCallback((status: string) => {
        setEventData((prev) => ({
            ...prev,
            status
        }));
    }, [setEventData]);

    const handleUpdateTimeLine = useCallback((block: { name: string, time: string }[]) => {
        setEventData((prev) => {
            const content = prev.content.map((contentBlock) => contentBlock.block === 'timeline' ? {
                ...contentBlock,
                payload: block
            } : contentBlock);

            return ({
                ...prev,
                content,
            });
        });
    }, []);

    return {
        eventData,
        handleBaseFieldChange,
        handleChangeStatus,
        handleMetadataFieldChange,
        handleDesriptionChange,
        handleUpdateTimeLine,
        resetForm,
        setEventData
    };
};
