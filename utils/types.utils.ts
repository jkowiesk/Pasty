import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  username: string;
  email: string;
  avatar?: string;
};

export type UserDoc = {
  username: string;
  email: string;
  avatar?: string;
};

export type SimpleUser = {
  username: string;
  avatar: string;
};

export type Story = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  uid: string;
  created: {
    date: string;
    time: string;
  };
  ratings: {
    likes: number;
    dislikes: number;
  };
};

export type StoryDB = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  uid: string;
  created: Timestamp;
  ratings: {
    likes: string[];
    dislikes: string[];
  };
};

export type StoryCardType = {
  story: Story;
  user: UserDoc;
};

export type StoryDoc = {
  title: string;
  content: string;
  tags: string[];
  uid: string;
  created: {
    date: string;
    time: string;
  };
  ratings: {
    likes: number;
    dislikes: number;
  };
};

export type StoryRequired = {
  title: string;
  content: string;
  tags: string[];
  uid: string;
};

export type newStory = {
  title: string;
  content: string;
  tags: string;
  uid: string;
};

export type isOpenType = "true" | "false" | "";
