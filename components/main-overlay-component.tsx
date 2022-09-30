import { useContext, useState } from "react";
import styled from "styled-components";
import { EventsContext } from "../contexts/events.context";
import Alert from "./alert.component";
import ConfirmationDialog from "./confirmation-dialog.component";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function MainOverlay({ children }: Props) {
  return (
    <Wrapper>
      <LeftSide></LeftSide>
      <Main>{children}</Main>
      <RightSide></RightSide>
    </Wrapper>
  );
}

const LeftSide = styled.div`
  grid-area: left;
`;

const Main = styled.div`
  grid-area: main;
`;

const RightSide = styled.div`
  grid-area: right;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: minmax(80px, auto) 3.5fr minmax(80px, auto);
`;
