import {Event} from "../types/event";
import {AuthData} from "../types/auth";

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

export const defaultNewEvent:Event = {
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

export const defaultAuthData:AuthData = {
    login:"",
    password:"",
}

