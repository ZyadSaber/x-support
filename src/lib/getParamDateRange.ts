const getParamDateRange = (date_from?: string, date_to?: string) => ({
  gte: new Date(new Date(date_from || undefined).setHours(0, 0, 0, 0)),
  lte: new Date(new Date(date_to || undefined).setHours(23, 59, 0, 0)),
});

export default getParamDateRange;
