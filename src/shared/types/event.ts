export interface Event{
    id: string,
    name: string,
    metadata: {
        datetime: string,
        location: string
    },
    status: string,
    content: EventContentBlock[]
}

export interface PromoTextBlock {
    block: "promotext";
    payload: string[];
}

export interface EventsState{
    events: Event[];
}

export type EventContentBlock = | PromoTextBlock

export type EventBaseField = 'name';
export type EventMetadataField = keyof Event['metadata'];