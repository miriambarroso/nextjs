import * as dateFns from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateToLocale(date: string) {
  const apiFormat = 'yyyy-MM-dd';
  const dateFormat = 'LLLL, yyyy';
  return dateFns.format(
    dateFns.parse(date, apiFormat, new Date()),
    dateFormat,
    { locale: ptBR },
  );
}
