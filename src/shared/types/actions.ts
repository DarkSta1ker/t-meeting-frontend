import {Event} from "./event";

export type Action=
    // | {type: "AddEvent", payload:Event}
    | {type: "SetEvent", payload:Event}
    | {type: "SetEvents", payload:Event[]}
    | {type: "DeleteEvent", payload:string}

