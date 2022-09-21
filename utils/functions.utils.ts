import { Story } from "./types.utils";

export const DateToJSON = (date: Date) => {
  return {
    time: `${date.getHours()}:${date.getMinutes()}`,
    date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
  };
};

export const pickStories = (stories: Story[], num: number) => {
  const shuffled = [...stories].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};
