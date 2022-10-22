import styled from "styled-components";

import { EmotionSad } from "@styled-icons/remix-line/EmotionSad";

type Props = {
  text: string;
};

export default function NoStories({ text }: Props) {
  return (
    <Wrapper>
      <Header>{text}</Header>
      <SadIcon />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 32px;
  gap: 64px;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: var(--color-secondary);
`;

const SadIcon = styled(EmotionSad)`
  color: var(--color-secondary-light);
  width: 50%;
`;
