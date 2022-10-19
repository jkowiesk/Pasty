import styled, { keyframes } from "styled-components";

import Image from "next/image";
import Icon from "../public/images/pasty_icon_rotR.png";

import Layout from "../components/layout.component";
import MainOverlay from "../components/main-overlay-component";

type Props = {};

type Event = React.FormEvent<HTMLInputElement>;

export default function About() {
  return (
    <Layout>
      <MainOverlay>
        <MaxWidthWrapper>
          <Header>
            About Pasty
            <PastyIconWrapper>
              <Image src={Icon} alt="Icon" priority={true} />
            </PastyIconWrapper>
          </Header>
          <Hr />
          <Paragraph>
            Internet forum, where everyone can share, copy and paste copypastas.
            With many built-in features and an easy to navigate interface, users
            now can enjoy stories like never before.
          </Paragraph>
          <Paragraph>
            Search feature enables fast and intuitive way to find content using
            simple tags. Account system gives user ability to rate copypastas,
            add them to favorites or even follow other users.
          </Paragraph>
        </MaxWidthWrapper>
      </MainOverlay>
    </Layout>
  );
}

const Header = styled.h1`
  color: var(--color-secondary);
  font-size: 2.5rem;
  width: fit-content;
  position: relative;
`;

const Hr = styled.hr`
  margin-bottom: 32px;
  width: 100%;
  border: 5px solid var(--color-background-secondary);
  border-radius: 0 0 200% 200%;
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
