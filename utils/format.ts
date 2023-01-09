import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const formatDate = (date: string | Date) => {
  const newDate = dayjs(date);
  return newDate.format("DD/MM/YYYY");
};
const formatDateVar = (date: string | Date) => {
  const newDate = dayjs(date);
  return newDate.format("DD MMM YY");
};
const formatTime = (date: string | Date) => {
  const newDate = dayjs(date);
  return newDate.format("HH:MM:s");
};
const formatTimeRelative = (baseDate: string | Date) => {
  const newBaseDate = dayjs(baseDate);
  return dayjs().from(newBaseDate);
};
export { formatDate, formatDateVar, formatTime, formatTimeRelative };
