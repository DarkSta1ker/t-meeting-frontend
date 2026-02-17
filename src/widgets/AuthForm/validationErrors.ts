import {max, min, regexp, required} from '../../shared/utils/validationFunctions';

export const validateLogin = (login: string): string => {
    return required({value: login, message: 'Логин обязателен'})
        || min({value: login, conditions: 3, message: 'Логин должен содержать минимум 3 символа'})
        || max({value: login, conditions: 20, message: 'Логин не должен превышать 20 символов'})
        || regexp({
            value: login,
            conditions: /^[a-zA-Z0-9_-]+$/,
            message: 'Логин может содержать только буквы, цифры, дефисы и подчеркивания'
        });
};

export const validatePassword = (password: string): string => {
    return required({value: password, message: 'Пароль обязателен'})
        || min({value: password, conditions: 6, message: 'Пароль должен содержать минимум 6 символов'})
        || max({value: password, conditions: 50, message: 'Максимальная длина - 50 символов'});
};
