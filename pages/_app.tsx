import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import UserProvider from "../contexts/user.context";
import EventProvider from "../contexts/events.context";
import HomeProvider from "../contexts/home.context";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  usePreserveHomeScroll();

  return (
    <>
      <Head>
        <title>CopyPasty</title>
      </Head>
      <EventProvider>
        <UserProvider>
          <HomeProvider>
            <Component {...pageProps} />
          </HomeProvider>
        </UserProvider>
      </EventProvider>
    </>
  );
}

export default MyApp;

export const usePreserveHomeScroll = () => {
  const router = useRouter();

  const scrollPositions = useRef<{ [url: string]: number }>({});

  useEffect(() => {
    const onRouteChangeStart = () => {
      if (router.pathname === "/") {
        const url = router.pathname;
        scrollPositions.current[url] = window.scrollY;
      }
    };

    const onRouteChangeComplete = (url: any) => {
      if (router.pathname === "/") {
        window.scroll({
          top: scrollPositions.current[url],
          behavior: "auto",
        });
      }
    };

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router]);
};
