import {ResultError} from "../../../shared/types/api";

export const createResultError = (error: unknown): ResultError => {
    return {
        status: 'Error',
        payload: error
    };
} 