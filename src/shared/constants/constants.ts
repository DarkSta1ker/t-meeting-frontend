import {AccountData} from '../types/account';
import {AuthData} from '../types/auth';
import {EventListItem} from '../types/event';

export const defaultEvent: EventListItem = {
    content: [
        {
            block: 'promo-text',
            payload: [],
        }
    ],
    id: '',
    metadata: {
        datetime: '',
        location: ''
    },
    name: '',
    status: 'draft',
    createdAt: '',
    updatedAt: '',
};

export const defaultAuthData: AuthData = {
    login: '',
    password: '',
};

export const defaultAccountData: AccountData = {
    login: '',
    email: '',
    role: '',
    avatarPhoto: process.env.PUBLIC_URL + '/images/BaseAvatar.jpg'
};

export const getRuStatus = (status: string) => {
    switch (status) {
        case 'draft':
            return 'Редактирование';
        case 'cancelled':
            return 'Отменено';
        case 'archived':
            return 'Архивировано';
        default:
            return 'Опубликовано';
    }
};
