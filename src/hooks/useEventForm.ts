import {useCallback, useEffect, useState} from 'react';
import {defaultEvent} from '../shared/constants/constants';
import {EventBaseField, EventMetadataField, } from '../shared/types/event';
import {useEvent} from './useEvent';

export const useEventForm = (eventId?: string) => {
    const {getEvent} = useEvent();
    const [eventData, setEventData] = useState(defaultEvent);
    useEffect(() => {
        if (!eventId) {
            setEventData(defaultEvent);
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
            return ({
                ...prev,
                content: [
                    ...prev.content.map((contentBlock) => contentBlock.block === "promo-text" ? {
                        ...contentBlock,
                        payload: [value]
                    } : contentBlock)
                ]
            });
        });
    }, [setEventData]);

    const resetForm = useCallback(() => {
        setEventData(defaultEvent);
    }, []);

    const handleChangeStatus = useCallback((status: string) => {
        setEventData((prev) => ({
            ...prev,
            status
        }));
    }, [setEventData]);

    return {
        eventData,
        handleBaseFieldChange,
        handleChangeStatus,
        handleMetadataFieldChange,
        handleDesriptionChange,
        resetForm,
        setEventData
    };
};
