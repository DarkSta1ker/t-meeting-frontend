import {Event} from "../types/event";
import {AuthData} from "../types/auth";
import {AccountData} from "../types/account";

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

export const defaultAccountData:AccountData = {
    login: "",
    email: "",
    role: "",
    avatarPhoto: "/images/BaseAvatar.jpg"
}

