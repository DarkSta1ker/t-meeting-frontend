import {createApiClient} from '../../api/requestor';
import {EventBase, EventListItem} from '../../shared/types/event';

const eventApi = createApiClient('/api');

export const EventService = {
    async addEvent(eventPayload: EventBase) {
        return eventApi('/event', {method: 'POST', body: eventPayload});
    },

    async getEvent(eventId: string): Promise<EventListItem> {
        return eventApi(`/event/${eventId}`, {method: 'GET'});
    },

    async getAllEvents(): Promise<EventListItem[]> {
        return eventApi('/events', {method: 'GET'});
    },

    async deleteEvent(eventId: string) {
        return eventApi(`/event/${eventId}`, {method: 'DELETE'});
    },

    async updateEvent(eventPayload: EventListItem) {
        return eventApi(`/event/${eventPayload.id}`, {
            method: 'PUT',
            body: eventPayload,
        });
    },
};
