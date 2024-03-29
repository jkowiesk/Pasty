/* eslint "react-hooks/exhaustive-deps": "off" */
import styled, { keyframes, css } from "styled-components";

import { Cross } from "@styled-icons/entypo/Cross";

import { Dialog } from "@headlessui/react";
import { useEffect, useState, useContext } from "react";

import { EventsContext } from "../contexts/events.context";
import { isMobile } from "../utils/constants.utils";

type Props = {};

type StyleProps = {
  type: string;
  isClosing: boolean;
  children: JSX.Element[];
};

export default function Alert() {
  const {
    alert: { message, type },
    dispatchEvents,
  } = useContext(EventsContext);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    const isChrome = navigator.userAgent.indexOf("Chrome") != -1;
    const mql = window.matchMedia(isMobile);
    if (!mql.matches && isChrome) {
      const html = document.getElementsByTagName("html")[0];
      html.style.overflowY = "scroll";
      html.style.padding = "0";
    }

    const timeout = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        dispatchEvents({ type: "alert", payload: "pasty/close" });
      }, 400);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Dialog open={true} onClose={() => {}}>
      <Panel isClosing={isClosing} type={type}>
        <Cancel
          onClick={() => {
            dispatchEvents({ type: "alert", payload: "pasty/close" });
          }}
        >
          <CrossIcon />
        </Cancel>
        <p>{message}</p>
      </Panel>
    </Dialog>
  );
}

const open = keyframes`
  from {
    transform: translateY(-300%);
  }

  to {
    transform: translateY(0);
  }
`;

const close = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-300%);
  }
`;

const Panel = styled(Dialog.Panel)`
  padding-left: 8px;
  padding-right: 32px;
  padding-block: 16px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 1px solid
    ${({ type }: StyleProps) =>
      type === "error" ? "var(--color-error)" : "var(--color-success)"};
  border-bottom: 8px solid
    ${({ type }: StyleProps) =>
      type === "error" ? "var(--color-error)" : "var(--color-success)"};
  width: max(300px, 25vw);
  heigh: 100px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: fixed;

  left: 0;
  right: 0;
  margin: 0 auto;
  box-shadow: var(--shadow-elevation-high);

  animation: ${({ isClosing }: StyleProps) =>
    isClosing
      ? css`
          ${close} 0.5s ease-out
        `
      : css`
          ${open} 0.5s ease-out
        `};

  top: 50px;
`;

const Cancel = styled.button`
  width: 50px;
  height: 50px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-primary-dark);
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto 0;

  &:hover {
    color: var(--color-secondary);
  }
`;

const CrossIcon = styled(Cross)`
  height: 100%;
  width: 100%;
`;
