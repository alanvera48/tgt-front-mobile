import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  format,
  parseISO,
} from 'date-fns';
import {formatInTimeZone} from 'date-fns-tz';

export const getDifferenceInTime = date => {
  const cleanedDateString = date.replace(/([+-]\d{2}:\d{2}|Z)$/, '');
  const now = formatInTimeZone(
    new Date(),
    'America/Argentina/Buenos_Aires',
    'yyyy-MM-dd HH:mm:ssXXX',
  );

  const nowInBuenosAires = now.replace(/([+-]\d{2}:\d{2}|Z)$/, '');

  const zonedCompareDate = parseISO(cleanedDateString);
  const diffMinutes = differenceInMinutes(nowInBuenosAires, zonedCompareDate);

  const diffHours = differenceInHours(nowInBuenosAires, zonedCompareDate);
  const diffDays = differenceInDays(nowInBuenosAires, zonedCompareDate);

  let result = '';

  if (diffMinutes < 1) {
    result = 'Hace menos de un minuto';
  } else if (diffMinutes < 60) {
    result = `Hace ${diffMinutes} minuto(s)`;
  } else if (diffHours < 24) {
    result = `Hace ${diffHours} hora(s)`;
  } else if (diffDays < 7) {
    result = `Hace ${diffDays} día(s)`;
  } else {
    result = format(zonedCompareDate, 'dd/MM/yyyy HH:mm');
  }

  return result;
};
