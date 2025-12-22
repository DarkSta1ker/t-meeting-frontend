export const validateLogin = (login: string) => {
    if (!login.trim()) {
        return 'Логин обязателен';
    }
    if (login.length < 3) {
        return 'Минимальная длина - 3 символов';
    }
    if (login.length > 50) {
        return 'Максимальная длина - 50 символов';
    }
    return '';
};
export const validatePassword = (password: string) => {
    if (!password) {
        return 'Пароль обязателен';
    }
    if (password.length < 6) {
        return 'Минимальная длина - 6 символов';
    }
    if (password.length > 50) {
        return 'Максимальная длина - 50 символов';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(password)) {
        return 'Разрешенные символы: a-z A-Z 0-9 _ -';
    }
    if (/\s/.test(password)) {
        return 'Пароль не должен содержать пробелы';
    }
    return '';
}
