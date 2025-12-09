import {AuthData} from "../types/auth";
import {AccountData} from "../types/account";
import {EventListItem} from "../types/event";

export const defaultEvent:EventListItem = {
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

