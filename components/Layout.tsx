import styled from "styled-components";
import Header from "./Header";

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <Overlay>
      <Header />
      <SideBar></SideBar>
      <Main>{children}</Main>
      <Aside></Aside>
    </Overlay>
  );
}

const Overlay = styled.div`
  background: var(--color-background);
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside";
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr minmax(40ch, 3.5fr) 1fr;

  min-height: 100%;
`;

const HeaderWrapper = styled.div`
  grid-area: header;
`;

const SideBar = styled.div`
  grid-area: sidebar;
`;

const Main = styled.div`
  grid-area: main;
  padding: 20px;
  min-height: 100%;
`;

const Aside = styled.div`
  grid-area: aside;
`;
