import styled from "styled-components";
import Header from "./header.component";

type Props = {
  fullMain?: boolean;
  children: JSX.Element | JSX.Element[];
};

export default function Layout({ children }: Props) {
  return (
    <Overlay>
      <Header />
      <Main>{children}</Main>
    </Overlay>
  );
}

export const Main = styled.div`
  grid-area: main;
`;

const Overlay = styled.div`
  background: var(--color-background);
  display: grid;
  grid-template-areas:
    "header"
    "main";
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;

  min-height: 100%;
`;

const Footer = styled.div`
  grid-area: header;
`;

/* minmax(40ch, 3.5fr) */
