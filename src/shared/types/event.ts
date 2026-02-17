export interface EventBase {
    name: string;
    metadata: {
        datetime: string,
        location: string
    };
    status: string;
    content: EventContentBlock[];
    createdAt?: string;
    updatedAt?: string;
}

export type EventNew = EventBase;

export interface EventListItem extends EventBase {
    id: string;
    name: string;
    metadata: {
        datetime: string,
        location: string
    };
    status: string;
    content: EventContentBlock[];
    createdAt: string;
    updatedAt: string;
}

export interface PromoTextBlock {
    block: 'promo-text';
    payload: string[];
}

export interface TimeLineBlock {
    block: 'timeline';
    payload: { name: string, time: string }[]
}

export type EventContentBlock = | PromoTextBlock | TimeLineBlock;

export type EventBaseField = 'name';
export type EventMetadataField = keyof EventBase['metadata'];
