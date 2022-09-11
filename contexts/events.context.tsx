import { createContext, useReducer, useState } from "react";

type Props = {
  children: JSX.Element;
};

type Context = {
  alert: Event;
  redirect: Event;
  dispatchEvents: any;
};

type Event = {
  isActive: boolean;
  message?: string;
  type: string;
};

type Events = {
  alert: Event;
  redirect: Event;
};

const eventsReducer = (state: any, action: any) => {
  console.log(action);
  const { payload, type } = action;
  if (type === "alert") {
    switch (payload) {
      case "pasty/logged-in":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Successfully logged in",
            type: "success",
          },
        };
      case "auth/wrong-password":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Wrong password",
            type: "error",
          },
        };
      case "pasty/rating":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "You need to be logged in",
            type: "error",
          },
        };
      case "pasty/copy":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Story copied to clipboard",
            type: "success",
          },
        };
      case "pasty/close":
        return {
          ...state,
          alert: {
            isActive: false,
            message: "",
            type: "",
          },
        };
      default:
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Something went wrong, try again later",
            type: "error",
          },
        };
    }
  } else if (type === "redirect") {
    switch (payload) {
      case "pasty/logged-in":
        return {
          ...state,
          redirect: {
            isActive: true,
            type: "pasty/logged-in",
          },
        };
      case "pasty/end":
        return {
          ...state,
          redirect: {
            isActive: false,
            type: "",
          },
        };
    }
  } else {
    return state;
  }
};

const INIT_VALUE_EVENTS: Events = {
  alert: { isActive: false, message: "", type: "" },
  redirect: { isActive: false, message: "", type: "" },
};

export const EventsContext = createContext<Context>({
  ...INIT_VALUE_EVENTS,
  dispatchEvents: null,
});

export default function EventProvider({ children }: Props) {
  const [events, dispatchEvents] = useReducer(eventsReducer, INIT_VALUE_EVENTS);

  return (
    <EventsContext.Provider value={{ ...events, dispatchEvents }}>
      {children}
    </EventsContext.Provider>
  );
}
