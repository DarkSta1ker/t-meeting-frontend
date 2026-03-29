import {AccountData} from '../types/account';
import {AuthContextType} from '../types/auth';
import {EventListItem, EventNew} from '../types/event';

export const defaultNewEvent: EventNew = {
    content: [
        {
            block: 'promo-text',
            payload: [],
        },
        {
            block: 'timeline',
            payload: [],
        },
        {
            block: 'map',
            payload: {
                background: '',
                points: []
            }
        }
    ],
    metadata: {
        datetime: '',
        location: ''
    },
    name: '',
    status: 'draft',
    createdAt: '',
    updatedAt: '',
};

export const defaultEditEvent: EventListItem = {
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

export const radioStyles = {
    green: {
        color: '#34c658',
        '&.Mui-checked': {color: '#34c658'},
    },
    yellow: {
        color: '#fecd00',
        '&.Mui-checked': {color: '#fecd00'},
    },
    blue: {
        color: '#00c5ff',
        '&.Mui-checked': {color: '#00c5ff'},
    },
    red: {
        color: '#ec231e',
        '&.Mui-checked': {color: '#ec231e'},
    },
};

export const buttonStyles = {
    cancel: {
        color: '#fecd00',
        borderColor: '#fecd00',
        fontWeight: 'bold',
        border: '2px solid #fecd00',
        '&:hover': {backgroundColor: 'rgba(255,249,0,0.26)'}
    },
    delete: {
        color: '#ec231e',
        borderColor: '#ec231e',
        fontWeight: 'bold',
        border: '2px solid #ec231e',
        '&:hover': {backgroundColor: 'rgba(255,0,13,0.26)'}
    },
    submit: {
        color: '#34c658',
        borderColor: '#34c658',
        fontWeight: 'bold',
        border: '2px solid #34c658',
        '&:hover': {backgroundColor: 'rgba(28,255,0,0.26)'}
    },
};

export const ROUTES = {
    AUTH: '/',
    EVENTS_LIST: '/eventsList',
    CREATE_EVENT: '/createEvent',
    EDIT_EVENT: '/editEvent/:eventId',
    PERSONAL_ACCOUNT: '/personalAccount',
    EVENT: '/event/:eventId',
} as const;
export const buildEventRoute = (eventId: string | number) => `/event/${eventId}`;
export const buildEditEventRoute = (eventId: string | number) => `/editEvent/${eventId}`;

export const defaultAuthContext: AuthContextType = {
    isAuth: false,
    isLoadingAuth: false,
    userData: null,
    authUser: async () => ({
        status: 'Error' as const,
        payload: 'Auth context not initialized',
    }),
    regUser: async () => ({
        status: 'Error' as const,
        payload: 'Auth context not initialized',
    }),
    authError: '',
    setAuthError: () => {
    },
    logoutUser: () => {
    },

};
