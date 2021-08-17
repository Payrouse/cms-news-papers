import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localeEn from 'dayjs/locale/en';
import localeEs from 'dayjs/locale/es';

const DATE_FORMAT = 'DD/MM/YYYY HH:mm A';

export const ControllerDate = {
  timeAgo(dateIso: any) {
    let locale = localeEs;
    const day = dayjs;
    day.extend(relativeTime);
    return day(dateIso).locale(locale).fromNow();
  },
  parseDate(dateIso:any) {
    return dayjs(dateIso).format(DATE_FORMAT);
  },
};
