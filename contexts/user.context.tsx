import { createContext, useEffect, useState } from "react";

import { onAuthChange } from "../utils/firebase.utils";

import { UserSimple } from "../utils/types.utils";

type Props = {
  children: JSX.Element;
};

type Context = {
  user: UserSimple;
  isLoggedIn: boolean;
};

export const UserContext = createContext<Context>({
  user: {
    uid: "",
    username: "",
    avatar: "",
  },
  isLoggedIn: false,
});

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<UserSimple>({
    uid: "",
    username: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthChange(setUser, setIsLoggedIn);
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
