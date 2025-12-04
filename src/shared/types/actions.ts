import {Event} from "./event";

export type Action=
    | {type: "SetEvent", payload:Event}
    | {type: "SetEvents", payload:Event[]}
    | {type: "DeleteEvent", payload:string}

