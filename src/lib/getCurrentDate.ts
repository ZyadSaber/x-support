import { format, subDays } from "date-fns";

const getCurrentDate = (dateFormat?: string) =>
  format(new Date(), dateFormat || "yyyy-MM-dd");

export default getCurrentDate;
