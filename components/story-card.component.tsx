import styled, { keyframes } from "styled-components";
import { useState } from "react";

import { Story, StoryDoc, User, UserDoc } from "../utils/types.utils";

import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { Person } from "@styled-icons/bootstrap/Person";

import { Happy } from "@styled-icons/boxicons-regular/Happy";
import { Sad } from "@styled-icons/boxicons-regular/Sad";

import Image from "next/image";
import Link from "next/link";

import AnimatedIcon from "./animated-icon.component";

type Props = {
  full?: boolean;
  story: Story;
  user: UserDoc;
  className?: any;
};

type PreviewCardProps = {
  isCardActive: boolean;
  className?: any;
};

type LinkWrapperProps = {
  setIsCardActive: any;
};

export default function StoryCard({
  full,
  story: { id, title, uid, content },
  user: { username, avatar },
  className,
}: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const [isRatingActive, setIsRatingsActive] = useState<{
    like: boolean;
    dislike: boolean;
  }>({ like: false, dislike: false });

  const StoryCardPreview = () => {
    const [isCardActive, setIsCardActive] = useState<boolean>(false);
    return (
      <PreviewCard isCardActive={isCardActive} className={className}>
        <Link href={`/pasty/${id}`} passHref>
          <LinkWrapper
            onMouseDown={() => {
              setIsCardActive(true);
            }}
            onMouseLeave={() => {
              if (isCardActive) setIsCardActive(false);
            }}
          >
            <Header>
              <Title>{title}</Title>
            </Header>
            <ContentPreview>{content}</ContentPreview>
          </LinkWrapper>
        </Link>
        <Footer>
          <AnimatedIcon
            onClick={handleCopy}
            text="Copy"
            onHoverColor="var(--color-secondary-light)"
          >
            <CopyIconPreview isCardActive={isCardActive} />
          </AnimatedIcon>
          <Link href={`/users/${username}`} passHref>
            <UserBar>
              <Avatar src={avatar!} width={40} height={40} alt="avatar" />
              <Username>{username}</Username>
            </UserBar>
          </Link>
          <RatingBar>
            <AnimatedIcon
              text="Dislike"
              onHoverColor="var(--color-secondary-light)"
            >
              <SadIconPreview isCardActive={isCardActive} />
            </AnimatedIcon>
            <AnimatedIcon
              text="Like"
              onHoverColor="var(--color-secondary-light)"
            >
              <HappyIconPreview isCardActive={isCardActive} />
            </AnimatedIcon>
          </RatingBar>
        </Footer>
      </PreviewCard>
    );
  };

  const StoryCardFull = () => (
    <Card className={className}>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{content}</Content>
      <Footer>
        <AnimatedIcon
          onClick={handleCopy}
          text="Copy"
          onHoverColor="var(--color-secondary-light)"
        >
          <CopyIcon />
        </AnimatedIcon>
        <Link href={`/users/${username}`} passHref>
          <UserBar>
            <Avatar src={avatar!} width={40} height={40} alt="avatar" />
            <Username>{username}</Username>
          </UserBar>
        </Link>
        <RatingBar>
          <AnimatedIcon
            text="Dislike"
            onHoverColor="var(--color-secondary-light)"
          >
            <SadIcon />
          </AnimatedIcon>
          <AnimatedIcon text="Like" onHoverColor="var(--color-secondary-light)">
            <HappyIcon />
          </AnimatedIcon>
        </RatingBar>
      </Footer>
    </Card>
  );

  if (username) {
    if (full) {
      return <StoryCardFull />;
    } else {
      return <StoryCardPreview />;
    }
  } else {
    return null;
  }
}

const storyClick = keyframes`
  from {
    background: var(--color-gray-1000);
  }
  to {
    background: var(--color-gray-800);
  }
`;

const Card = styled.div`
  padding-inline: 8px;
  padding-block: 16px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 2px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: var(--shadow-elevation-low);
  min-height: 400px;
  width: 100%;
`;

const LinkWrapper = styled.a`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-decoration: none;
  flex: 1;
`;

const PreviewCard = styled(Card)`
  background: ${({ isCardActive }: PreviewCardProps) =>
    isCardActive ? "var(--color-gray-800)" : "var(--color-gray-1000)"};
  animation: ${({ isCardActive }: PreviewCardProps) =>
      isCardActive ? storyClick : null}
    0.5s;
`;

const Title = styled.h1`
  color: var(--color-font-black);
`;

const Header = styled.div`
  width: fit-content;
`;

const Content = styled.p`
  font-size: 1.1rem;
  white-space: pre-line;
  color: var(--color-font-black);
  flex: 1;
`;

const ContentPreview = styled(Content)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
`;

const Footer = styled.footer`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconBtn = styled.button`
  padding: 5px;
  border: 0;
  background: transparent;
  color: var(--color-secondary);
  cursor: pointer;
`;

const CopyIcon = styled(Copy)`
  width: calc(var(--icons-size) - 5px);
  height: calc(var(--icons-size) - 5px);
  color: var(--color-secondary);
  background: var(--color-gray-1000);
  position: relative;
  z-index: 1;
`;

const CopyIconPreview = styled(CopyIcon)`
  background: ${({ isCardActive }: PreviewCardProps) =>
    isCardActive ? "transparent" : "var(--color-gray-1000)"};
`;

const HappyIcon = styled(Happy)`
  width: var(--icons-size);
  height: var(--icons-size);
  color: var(--color-secondary);
  background: var(--color-gray-1000);
  position: relative;
  z-index: 1;
`;

const HappyIconPreview = styled(HappyIcon)`
  background: ${({ isCardActive }: PreviewCardProps) =>
    isCardActive ? "transparent" : "var(--color-gray-1000)"};
`;

const SadIcon = styled(Sad)`
  width: var(--icons-size);
  height: var(--icons-size);
  color: var(--color-secondary);
  background: var(--color-gray-1000);
  position: relative;
  z-index: 1;
`;

const SadIconPreview = styled(SadIcon)`
  background: ${({ isCardActive }: PreviewCardProps) =>
    isCardActive ? "transparent" : "var(--color-gray-1000)"};
`;

const UserBar = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline var(--color-distinct);
  }
`;

const Avatar = styled(Image)`
  border-radius: 50%;
`;

const Username = styled.p`
  color: var(--color-secondary);
  padding-top: 5px;
`;

const PersonIcon = styled(Person)`
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
`;

const RatingBar = styled.div``;
