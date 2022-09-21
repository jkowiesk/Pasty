import { createContext, useEffect, useState } from "react";

import { Story, StoryCardType } from "../utils/types.utils";

type Props = {
  children: JSX.Element;
};

type Context = { storyCards: StoryCardType[]; setStoryCards: any };

export const HomeContext = createContext<Context>({
  storyCards: [],
  setStoryCards: null,
});

export default function UserProvider({ children }: Props) {
  const [storyCards, setStoryCards] = useState<StoryCardType[]>([]);

  return (
    <HomeContext.Provider value={{ storyCards, setStoryCards }}>
      {children}
    </HomeContext.Provider>
  );
}
