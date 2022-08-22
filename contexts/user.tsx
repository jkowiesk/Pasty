import { createContext, useEffect, useState } from "react";

import { onAuthChange } from "../utils/firebase.utils";

type Props = {
  children: JSX.Element;
};

type SimpleUser = {
  uid: string;
  username: string;
  avatar: string;
};

export const UserContext = createContext({
  user: {
    uid: "",
    username: "",
    avatar: "",
  },
  isLoggedIn: false,
});

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<SimpleUser>({
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
