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
    payload: { name: string, time: string }[];
}

export interface MapBlock {
    block: 'map';
    payload: { background: string, points: { x: number; y: number; text: string }[] };
}

export interface InteractivePoints {
    block: 'interactive-points';
    payload: {
        background: string;
        points: {
            x: number;
            y: number;
            text: string;
            timeline?: {
                name: string;
                time: string;
            }[]
        }[]
    };
}

export type EventContentBlock = | PromoTextBlock | TimeLineBlock | MapBlock | InteractivePoints;

export type EventBaseField = 'name';
export type EventMetadataField = keyof EventBase['metadata'];
