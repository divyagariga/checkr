const { parseISO, format } = require('date-fns');

export const formatDate = (inputDate: Date | string | null) => {
  if (!inputDate) return '';
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) return '';
  return format(date, 'M/dd/yyyy');
};

export const formatDateWithTime = (inputString: string) => {
  const inputDate = parseISO(inputString);
  const formattedDate = format(inputDate, "MMM dd',' yyyy h:mm:ss a");
  return formattedDate;
};
