export const DateToJSON = (date: Date) => {
  return {
    time: `${date.getHours}:${date.getMinutes}`,
    date: `${date.getDay}/${date.getMonth}/${date.getFullYear()}`,
  };
};
