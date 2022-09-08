import "../styles/globals.css";
import type { AppProps } from "next/app";

import UserProvider from "../contexts/user.context";
import EventProvider from "../contexts/events.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EventProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </EventProvider>
  );
}

export default MyApp;
