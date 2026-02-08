import {useCallback, useState} from 'react';
import {defaultNewEvent,} from '../shared/constants/constants';
import {EventBaseField, EventMetadataField,} from '../shared/types/event';

export const useNewEventForm = () => {
    const [eventData, setEventData] = useState(defaultNewEvent);

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
        setEventData(defaultNewEvent);
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
