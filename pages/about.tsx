import styled, { keyframes } from "styled-components";

import Image from "next/image";
import Icon from "../public/images/pasty_icon_rotR.png";

import Layout from "../components/layout.component";

type Props = {};

type Event = React.FormEvent<HTMLInputElement>;

export default function About() {
  return (
    <Layout>
      <Overlay>
        <LeftSide></LeftSide>
        <Main>
          <MaxWidthWrapper>
            <Header>
              About Pasty
              <PastyIconWrapper>
                <Image src={Icon} alt="Icon" />
              </PastyIconWrapper>
            </Header>
            <Hr />
            <Paragraph>
              Internet forum, where everyone can share, copy and paste
              copypastas. With many built-in features and an easy to navigate
              interface, users now can enjoy stories like never before.
            </Paragraph>
            <Paragraph>
              Search feature enables fast and intuitive way to find content
              using simple tags. Account system gives user ability to rate
              copypastas, add them to favorites or even follow other users.
            </Paragraph>
          </MaxWidthWrapper>
        </Main>
        <RightSide></RightSide>
      </Overlay>
    </Layout>
  );
}

const Overlay = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: 1fr minmax(40ch, 3.5fr) 1fr;
  padding-block: 64px;
`;

const LeftSide = styled.div`
  grid-area: left;
`;

const Main = styled.div`
  grid-area: main;
`;

const RightSide = styled.div`
  grid-area: right;
`;

const Header = styled.h1`
  color: var(--color-secondary);
  font-size: 2.5rem;
  width: fit-content;
  position: relative;
`;

const Hr = styled.hr`
  border: 1px solid var(--color-background-secondary);
  margin-bottom: 32px;
  width: 100%;
`;

const Paragraph = styled.p`
  color: var(--color-primary);
  font-size: 1.2rem;
`;

const MaxWidthWrapper = styled.div`
  display: flex;
  padding-block: 32px;
  gap: 32px;
  flex-direction: column;
  justify-content: center;
  width: min(100%, 900px);
  margin: 0 auto;
`;

const slideIn = keyframes`
  from {
    transform: translateX(150vw);
  }
  to {
    transform: translateX(0);
  }
`;

const PastyIconWrapper = styled.div`
  position: absolute;
  width: 50px;
  top: -10px;
  right: -25px;

  animation: ${slideIn} 3s ease-out;
`;
