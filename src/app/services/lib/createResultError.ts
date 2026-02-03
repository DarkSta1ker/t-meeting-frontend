import {ResultError} from '../../../shared/types/api';

export const createResultError = <T>(error: T): ResultError<T> => {
    return {
        status: 'Error',
        payload: error
    };
};
