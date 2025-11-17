export interface Event{
    id: string,
    name: string,
    metadata: {
        datetime: string,
        location: string
    },
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

export type Action=
    | {type: "AddEvent", payload:Event}
    | {type: "SetEvent", payload:Event}
    | {type: "SetEvents", payload:Event[]}
    | {type: "DeleteEvent", payload:string}

export type ApiData<T = Record<string, unknown>> = {
    url: string;
    method: string;
    payload?: T;
}

export type ResultSuccess<T> = {
    status: 'Success';
    payload: T;
}

export type ResultError = {
    status: 'Error';
    payload: unknown;
}