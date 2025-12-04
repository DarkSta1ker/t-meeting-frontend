import {Event, NewEvent} from "../types/event";

export const defaultEvent:Event = {
    id: "",
    name: "",
    metadata: {
        datetime: "",
        location: ""
    },
    status: "draft",
    content: [
        {
            block: "promotext",
            payload: []
        }
    ]
}

export const defaultNewEvent:NewEvent = {
    name: "",
    metadata: {
        datetime: "",
        location: ""
    },
    status: "draft",
    content: [
        {
            block: "promotext",
            payload: []
        }
    ]
}

