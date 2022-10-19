import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  username: string;
  email: string;
  avatar: string;
  favorites: string[];
  follows: string[];
  achievements: AchievementName[];
  followers: string[];
  description: string;
};

export type UserDoc = {
  username: string;
  email: string;
  avatar: string;
  favorites: string[];
  follows: string[];
  achievements: AchievementName[];
  followers: string[];
  description: string;
};

export type UserProfile = {
  uid: string;
  username: string;
  avatar: string;
  followers: string[];
  achievements: AchievementName[];
  description: string;
};

export type UserSimple = {
  uid: string;
  username: string;
  avatar: string;
};

export type Story = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  uid: string;
  created: string;
  ratings: {
    likes: number;
    dislikes: number;
  };
};

export type StoryDoc = {
  title: string;
  content: string;
  tags: string[];
  uid: string;
  created: string;
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

export type StoryDocDB = {
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
  user: UserSimple;
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

export type Result<T> = {
  result?: T;
  returnCode: string;
};

export type isOpenType = "true" | "false" | "";

export type AchievementName = "First Achievement";
