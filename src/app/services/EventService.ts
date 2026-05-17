import {createApiClient} from '../../api/requestor'; //не моки
//import {mockApiClient} from '../../shared/mocks/eventsMocks'; // моки
import {EventBase, EventListItem} from '../../shared/types/event';

//const eventApi = mockApiClient; // моки
const eventApi = createApiClient('http://localhost:33');//не моки

export const EventService = {
    async addEvent(eventPayload: EventBase) {
        return eventApi('/event', {method: 'POST', body: eventPayload});
    },

    async getEvent(eventId: string): Promise<EventListItem> {
        return eventApi(`/event/${eventId}`, {method: 'GET'});
    },

    async getPublishedEvent(eventId: string): Promise<EventListItem> {
        return eventApi(`/published-event/${eventId}`, {method: 'GET'});
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
