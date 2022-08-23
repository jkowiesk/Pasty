import "../styles/globals.css";
import type { AppProps } from "next/app";

import UserProvider from "../contexts/user.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
