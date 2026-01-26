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
