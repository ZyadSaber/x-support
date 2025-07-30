import { format, subDays } from "date-fns";

const getCustomDateRange = (range?: number, dateFormat?: string) => {
  const newDate = new Date();

  const toDate = format(newDate, dateFormat || "yyyy-MM-dd");
  const fromDate = format(
    subDays(newDate, range || 5),
    dateFormat || "yyyy-MM-dd"
  );
  return [fromDate, toDate];
};

export default getCustomDateRange;
