import styled from "styled-components";

type Props = {
  title: string;
  author: string;
  children: string;
};

export default function StoryCard({ title, author, children }: Props) {
  return (
    <Card>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{children}</Content>
      <Footer>{author}</Footer>
    </Card>
  );
}

const Card = styled.div`
  margin: 16px;
  padding: 8px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border-bottom: 8px solid var(--color-primary-dark);
`;

const Title = styled.h1``;

const Header = styled.div``;

const Content = styled.div``;

const Footer = styled.footer``;
