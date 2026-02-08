import {requestApi} from '../../shared/api/requestApi';
import {ApiData} from '../../shared/types/api';
import {EventBase, EventListItem} from '../../shared/types/event';
import {createResultError} from './lib/createResultError';
import {createResultSuccess} from './lib/createResultSuccess';

async function makeRequest<T>(
    apiData: ApiData<T>,
    parseResponse?: (response: Response) => Promise<T>
): Promise<any> {
    try {
        const response = await requestApi(apiData);

        if (response.ok === false) {
            return createResultError(
                new Error(`HTTP Error: ${response.status} ${response.statusText}`)
            );
        }

        if (parseResponse) {
            const payload = await parseResponse(response);
            return createResultSuccess<T>(payload);
        }

        return createResultSuccess(response);
    } catch (error) {
        return createResultError(error);
    }
}

export const EventService = {
    async addEvent(eventPayload: EventBase) {
        return makeRequest({
            url: '/api/event',
            method: 'POST',
            payload: eventPayload,
        });
    },

    async getEvent(eventId: string) {
        return makeRequest<EventListItem>({
            url: `/api/event/${eventId}`,
            method: 'GET',
        }, async (response) => await response.json());
    },

    async getAllEvents() {
        return makeRequest<EventListItem[]>({
            url: '/api/events',
            method: 'GET',
        }, async (response) => await response.json());
    },

    async deleteEvent(eventId: string) {
        return makeRequest({
            url: `/api/event/${eventId}`,
            method: 'DELETE',
        });
    },

    async updateEvent(eventPayload: EventListItem) {
        return makeRequest({
            url: `/api/event/${eventPayload.id}`,
            method: 'PUT',
            payload: eventPayload
        });
    }
};
