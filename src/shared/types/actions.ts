import { EventListItem} from "./event";

export type Action=
    | {type: "SetEvent", payload:EventListItem}
    | {type: "SetEvents", payload:EventListItem[]}
    | {type: "DeleteEvent", payload:string}

