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
    return  dayjs.utc().tz(userTZ).format('DD.MM.YYYY HH:mm');
};
export const getTimeAndDate = (datetime?: string) => {
    if (datetime) {
        return dayjs.utc(datetime).tz(userTZ);
    }
    return  dayjs.utc().tz(userTZ);
};
export const getCurrentDate = () => {
    return  dayjs.utc();
};
