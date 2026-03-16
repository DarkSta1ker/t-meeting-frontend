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
            getEvent(eventId)
                .then((res) => {
                    setEventData(res);
                    console.log('Event loaded');
                })
                .catch(err => {
                    console.log('Error while loading event: ', err);
                });
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

    const handleUpdateMapBlock = useCallback((block: {
        background: string,
        points: { x: number; y: number; text: string }[]
    }) => {
        setEventData((prev) => {
            const content = prev.content.map((contentBlock) => contentBlock.block === 'map' ? {
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
        handleUpdateMapBlock,
        handleUpdateTimeLine,
        resetForm,
        setEventData
    };
};
