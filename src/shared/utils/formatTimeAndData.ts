import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.locale('ru');
dayjs.extend(utc);
dayjs.extend(timezone);

export const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const getTimeAndDateString = (datetime?: string) => {
    if (datetime) {
        return dayjs.utc(datetime).tz(userTZ).format('DD.MM.YYYY HH:mm');
    }
    return dayjs.utc().tz(userTZ).format('DD.MM.YYYY HH:mm');
};
export const getTZTimeAndDate = (datetime?: string) => {
    if (datetime) {
        return dayjs.utc(datetime).tz(userTZ);
    }
    return dayjs.utc().tz(userTZ);
};
export const getTimeAndDate = (datetime?: string) => {
    if (datetime) {
        return dayjs.utc(datetime);
    }
    return dayjs.utc();
};
export const getTimeString = (timeString: string) => {
    try {
        if (timeString.includes('T')) {
            return timeString.split('T')[1].split('.')[0].substring(0, 5); // Берем часы и минуты
        }
        return timeString.substring(0, 5);
    } catch {
        return timeString;
    }
};
export const stringToTime = (timeString: string) => {
    if (timeString.includes('T')) {
        return dayjs.utc(timeString);
    } else {
        const [hours, minutes, seconds] = timeString.slice(0, -1).split(':').map(Number);
        return dayjs.utc().startOf('day').hour(hours).minute(minutes).second(seconds);
    }
};
export const timeToString = (time?: dayjs.Dayjs | null): string => {
    if (time) {
        return time.utc().format('HH:mm:ss') + 'Z';
    } else {
        return dayjs.utc().format('HH:mm:ss') + 'Z';
    }

};
