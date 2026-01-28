export const validateLogin = (login: string): string => {
    if (!login.trim()) {
        return 'Логин обязателен';
    }

    if (login.length < 3) {
        return 'Логин должен содержать минимум 3 символа';
    }

    if (login.length > 20) {
        return 'Логин не должен превышать 20 символов';
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(login)) {
        return 'Логин может содержать только буквы, цифры, дефисы и подчеркивания';
    }

    return '';
};

export const validatePassword = (password: string): string => {
    if (!password) {
        return 'Пароль обязателен';
    }

    if (password.length < 6) {
        return 'Пароль должен содержать минимум 6 символов';
    }

    if (password.length > 50) {
        return 'Максимальная длина - 50 символов';
    }
    return '';
};
