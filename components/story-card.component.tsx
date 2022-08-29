import styled from "styled-components";
import { Story } from "../utils/types.utils";

type Props = {
  story: Story;
  children: string;
};

export default function StoryCard({
  story: {
    title,
    author: { username },
  },
  children,
}: Props) {
  return (
    <Card>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{children}</Content>
      <Footer>{username}</Footer>
    </Card>
  );
}

const Card = styled.div`
  margin: 16px;
  padding: 8px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 1px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
`;

const Title = styled.h1``;

const Header = styled.div``;

const Content = styled.p`
  font-size: 1.1rem;
  white-space: pre-line;
`;

const Footer = styled.footer``;
