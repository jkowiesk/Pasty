export type User = {
  uid: string;
  username: string;
  avatar?: string;
};

export type UserDoc = {
  username: string;
  avatar?: string;
};

export type Story = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  uid: string;
};

export type StoryDoc = {
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
