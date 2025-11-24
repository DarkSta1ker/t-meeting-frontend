import {ResultSuccess} from "../../../shared/types/api";

export const createResultSuccess = <T>(payload: T):ResultSuccess<T> => {
    return{
        status: 'Success',
        payload: payload
    }
}
