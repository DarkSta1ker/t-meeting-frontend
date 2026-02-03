export interface validationFunc {
    value: string;
    conditions?: any;
    message: string;
}

export const required = ({value, conditions, message}: validationFunc): string => {
    if (conditions !== false && !value.trim()) {
        return message;
    }
    return '';
};

export const min = ({value, conditions, message}: validationFunc): string => {
    if (value.length < conditions) {
        return message;
    }
    return '';
};

export const max = ({value, conditions, message}: validationFunc): string => {
    if (value.length > conditions) {
        return message;
    }
    return '';
};

export const regexp = ({value, conditions, message}: validationFunc): string => {
    if (!conditions.test(value)) {
        return message;
    }
    return '';
};
