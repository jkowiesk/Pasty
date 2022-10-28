import { createContext, useReducer, useState } from "react";

type Props = {
  children: JSX.Element;
};

type Context = {
  alert: Event;
  redirect: Event;
  confirmation: DataEvent;
  dispatchEvents: any;
};

type Event = {
  isActive: boolean;
  message?: string;
  type: string;
};

type DataEvent = {
  isActive: boolean;
  message?: string;
  data: any;
  type: string;
};

type Events = {
  alert: Event;
  confirmation: DataEvent;
  redirect: Event;
};

const eventsReducer = (state: any, action: any) => {
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
      case "pasty/not-logged":
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
      case "pasty/registered":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Successfully registered",
            type: "success",
          },
        };
      case "pasty/delete/not-owner":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Users can only delete stories created by them",
            type: "error",
          },
        };
      case "pasty/delete/success":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Successfully deleted story",
            type: "success",
          },
        };
      case "pasty/follow/self":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "You cannot follow yourself!",
            type: "error",
          },
        };
      case "pasty/username/success":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Successfully changed username",
            type: "success",
          },
        };
      case "pasty/username/taken":
        return {
          ...state,
          alert: {
            isActive: true,
            message: "Given username is already taken, try different one",
            type: "error",
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
  } else if (type === "confirmation") {
    switch (payload.code) {
      case "pasty/delete":
        return {
          ...state,
          confirmation: {
            isActive: true,
            message: "Do you really want to delete this story ?",
            data: payload.data,
            type: "important",
          },
        };
      case "pasty/close":
        return {
          ...state,
          confirmation: {
            isActive: false,
            message: "",
            data: "",
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
            message: "",
            type: "pasty/logged-in",
          },
        };
      case "pasty/end":
        return {
          ...state,
          redirect: {
            isActive: false,
            message: "",
            type: "",
          },
        };
    }
  } else {
    return state;
  }
};

const INIT_VALUE_EVENTS: Events = {
  confirmation: { isActive: false, message: "", type: "", data: {} },
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
