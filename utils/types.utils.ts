export type User = {
  uid: string;
  username: string;
  avatar?: string;
};

export type Story = {
  title: string;
  content: string;
  tags: string[];
  author: User;
};

export type newStory = {
  title: string;
  content: string;
  tags: string;
  author: User;
};
