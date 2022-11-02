import { Story, StoryCardType } from "./types.utils";

export const DateToJSON = (date: Date) => {
  return {
    time: `${date.getHours()}:${date.getMinutes()}`,
    date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
  };
};

export const validateStoryCards = (storyCards: StoryCardType[]) => {
  let newStoryCards: StoryCardType[] = [];
  let storyIds: string[] = [];
  for (let storyCard of storyCards)
    if (!storyIds.includes(storyCard.story.id)) {
      storyIds.push(storyCard.story.id);
      newStoryCards.push(storyCard);
    }

  return newStoryCards;
};

export const pickStories = (stories: Story[], num: number) => {
  const shuffled = [...stories].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};
