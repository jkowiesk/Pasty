export const DateToJSON = (date: Date) => {
  return {
    time: `${date.getHours()}:${date.getMinutes()}`,
    date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
  };
};
