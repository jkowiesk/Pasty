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
  grid-template-rows: 150px 1fr;
  grid-template-columns: 3fr 5fr 3fr;

  height: 100%;
`;

const HeaderWrapper = styled.div`
  grid-area: header;
`;

const SideBar = styled.div`
  grid-area: sidebar;
`;

const Main = styled.div`
  grid-area: main;
`;

const Aside = styled.div`
  grid-area: aside;
`;
