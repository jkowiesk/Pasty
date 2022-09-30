import { useContext, useState } from "react";
import styled from "styled-components";
import { EventsContext } from "../contexts/events.context";
import Alert from "./alert.component";
import ConfirmationDialog from "./confirmation-dialog.component";
import Header from "./header.component";

type Props = {
  fullMain?: boolean;
  children: JSX.Element | JSX.Element[];
};

export default function Layout({ children }: Props) {
  const {
    alert: { isActive: isAlertActive },
    confirmation: { isActive: isConfirmationActive },
  } = useContext(EventsContext);

  return (
    <Overlay>
      <Header />
      <Content>{children}</Content>
      {isAlertActive && <Alert />}
      {isConfirmationActive && <ConfirmationDialog />}
    </Overlay>
  );
}

export const Content = styled.div`
  grid-area: content;
`;

const Overlay = styled.div`
  background: var(--color-background);
  display: grid;
  grid-template-areas:
    "header"
    "content";
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  min-height: 100%;
`;

const Footer = styled.div`
  grid-area: header;
`;

/* minmax(40ch, 3.5fr) */
