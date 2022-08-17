export type User = {
  uid: string;
  username: string;
};

export type Story = {
  title?: string;
  content: string;
  author: User;
};
