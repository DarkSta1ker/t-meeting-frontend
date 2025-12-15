export interface EventBase{
    name: string,
    metadata: {
        datetime: string,
        location: string
    },
    status: string,
    content: EventContentBlock[],
    createdAt?: string,
    updatedAt?: string,
}
export type EventNew = EventBase;
export interface EventListItem extends EventBase {
    id: string,
    name: string,
    metadata: {
        datetime: string,
        location: string
    },
    status: string,
    content: EventContentBlock[],
    createdAt?: string,
    updatedAt?: string,
}


export interface PromoTextBlock {
    block: "promo-text";
    payload: string[];
}

export interface EventsState{
    events: EventListItem[];
}


export type EventContentBlock = | PromoTextBlock

export type EventBaseField = 'name';
export type EventMetadataField = keyof EventBase['metadata'];

