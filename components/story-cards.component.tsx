import styled, { keyframes } from "styled-components";
import { useState, useEffect, useContext } from "react";

import {
  Story,
  StoryDoc,
  User,
  UserDoc,
  UserSimple,
} from "../utils/types.utils";
import {
  getIsFavorite,
  getStoryRatings,
  getStoryRatingsNum,
  updateFavorites,
  updateStoryRating,
} from "../utils/firebase.utils";

import { phoneAndSmaller, tabletAndSmaller } from "../utils/constants.utils";

import { UserContext } from "../contexts/user.context";
import { EventsContext } from "../contexts/events.context";

import { Copy } from "@styled-icons/boxicons-regular/Copy";

import { Happy } from "@styled-icons/boxicons-regular/Happy";
import { Sad } from "@styled-icons/boxicons-regular/Sad";

import Image from "next/image";
import Link from "next/link";

import AnimatedIcon from "./animated-icon.component";
import StoryCardDropdown from "./story-card-dropdown.component";

type Props = {
  full?: boolean;
  story: Story;
  user: UserSimple;
  className?: any;
};

type PreviewCardProps = {
  isCardActive: boolean;
  className?: any;
};

type RatingIconsProps = {
  isClicked: boolean;
};

const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const StoryCardFull = ({
  story: {
    id,
    title,
    content,
    created,
    tags,
    ratings: { likes, dislikes },
  },
  user: { username, avatar },
  className,
}: Props) => {
  const {
    user: { uid: clientsUid },
    isLoggedIn,
  } = useContext(UserContext);

  const { dispatchEvents } = useContext(EventsContext);

  const [areRatingsActive, setAreRatingsActive] = useState<{
    likes: boolean;
    dislikes: boolean;
  }>({ likes: false, dislikes: false });

  const [ratingsNum, setRatingsNum] = useState<{
    likes: number;
    dislikes: number;
  }>({ likes, dislikes });

  useEffect(() => {
    if (isLoggedIn) {
      getStoryRatings(id, clientsUid).then((data: any) => {
        setAreRatingsActive(data);
      });
    } else {
      setAreRatingsActive({ likes: false, dislikes: false });
    }
  }, [isLoggedIn, id, clientsUid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    dispatchEvents({ type: "alert", payload: "pasty/copy" });
  };

  const handleRatingClick = async (action: string) => {
    if (isLoggedIn) {
      setAreRatingsActive(await updateStoryRating(id, clientsUid, action));
      setRatingsNum(await getStoryRatingsNum(id));
    } else {
      dispatchEvents({ type: "alert", payload: "pasty/not-logged" });
    }
  };

  return (
    <Card className={className}>
      <SuperHeader>
        <Time>{formatter.format(new Date(created))}</Time>
        {isLoggedIn && <StoryCardDropdown id={id} />}
      </SuperHeader>
      <Header>
        <Title>{title}</Title>
        <RightHeader>
          {!!tags[0] && (
            <Tags>
              {tags.map((tag, idx) => (
                <Tag key={idx}>
                  <Link
                    href={{
                      pathname: "/search",
                      query: { tags: tag },
                    }}
                    passHref
                  >
                    <A>#{tag}</A>
                  </Link>
                </Tag>
              ))}
            </Tags>
          )}
        </RightHeader>
      </Header>
      <Content>{content}</Content>
      <Footer>
        <AnimatedIcon
          onClick={handleCopy}
          text="Copy"
          hovercolor="var(--color-secondary-light)"
        >
          <CopyIcon />
        </AnimatedIcon>
        <Link href={`/users/${username}`} passHref>
          <UserBar>
            <AvatarWrapper>
              <Avatar src={avatar!} layout="fill" alt="avatar" />
            </AvatarWrapper>
            <Username>{username}</Username>
          </UserBar>
        </Link>
        <RatingBar>
          <RatingWrapper>
            <AnimatedIcon
              text="Dislike"
              hovercolor={
                areRatingsActive.dislikes
                  ? "var(--color-distinct-light)"
                  : "var(--color-secondary-light)"
              }
              onClick={() => {
                areRatingsActive.dislikes
                  ? handleRatingClick("cancel")
                  : handleRatingClick("dislike");
              }}
            >
              <SadIcon isClicked={areRatingsActive.dislikes} />
            </AnimatedIcon>
            <RatingCounter>{ratingsNum.dislikes}</RatingCounter>
          </RatingWrapper>
          <RatingWrapper>
            <AnimatedIcon
              text="Like"
              hovercolor={
                areRatingsActive.likes
                  ? "var(--color-distinct-light)"
                  : "var(--color-secondary-light)"
              }
              onClick={() => {
                areRatingsActive.likes
                  ? handleRatingClick("cancel")
                  : handleRatingClick("like");
              }}
            >
              <HappyIcon isClicked={areRatingsActive.likes} />
            </AnimatedIcon>
            <RatingCounter>{ratingsNum.likes}</RatingCounter>
          </RatingWrapper>
        </RatingBar>
      </Footer>
    </Card>
  );
};

export const StoryCardPreview = ({
  story: {
    id,
    title,
    content,
    created,
    tags,
    ratings: { likes, dislikes },
  },
  user: { username, avatar },
  className,
}: Props) => {
  const [isCardActive, setIsCardActive] = useState<boolean>(false);
  const {
    user: { uid: clientsUid },
    isLoggedIn,
  } = useContext(UserContext);

  const { dispatchEvents } = useContext(EventsContext);

  const [areRatingsActive, setAreRatingsActive] = useState<{
    likes: boolean;
    dislikes: boolean;
  }>({ likes: false, dislikes: false });

  const [ratingsNum, setRatingsNum] = useState<{
    likes: number;
    dislikes: number;
  }>({ likes, dislikes });

  useEffect(() => {
    if (isLoggedIn) {
      getStoryRatings(id, clientsUid).then((data: any) => {
        setAreRatingsActive(data);
      });
    } else {
      setAreRatingsActive({ likes: false, dislikes: false });
    }
  }, [isLoggedIn, id, clientsUid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    dispatchEvents({ type: "alert", payload: "pasty/copy" });
  };

  const handleRatingClick = async (action: string) => {
    if (isLoggedIn) {
      setAreRatingsActive(await updateStoryRating(id, clientsUid, action));
      setRatingsNum(await getStoryRatingsNum(id));
    } else {
      dispatchEvents({ type: "alert", payload: "pasty/not-logged" });
    }
  };

  return (
    <PreviewCard isCardActive={isCardActive} className={className}>
      <SuperHeader>
        <Time>{formatter.format(new Date(created))}</Time>
        {isLoggedIn && (
          <StoryCardDropdown id={id} isCardActive={isCardActive} />
        )}
      </SuperHeader>
      <Header>
        <Title>{title}</Title>
        <RightHeader>
          {!!tags[0] && (
            <Tags>
              {tags.map((tag, idx) => (
                <Tag key={idx}>
                  <Link
                    href={{
                      pathname: "/search",
                      query: { tags: tag },
                    }}
                    passHref
                  >
                    <A>#{tag}</A>
                  </Link>
                </Tag>
              ))}
            </Tags>
          )}
        </RightHeader>
      </Header>
      <Link href={`/pasty/${id}`} passHref>
        <LinkWrapper
          onMouseDown={() => {
            setIsCardActive(true);
          }}
          onMouseLeave={() => {
            if (isCardActive) setIsCardActive(false);
          }}
        >
          <ContentPreview>{content}</ContentPreview>
        </LinkWrapper>
      </Link>
      <Footer>
        <AnimatedIcon
          onClick={handleCopy}
          text="Copy"
          hovercolor="var(--color-secondary-light)"
        >
          <CopyIconPreview isCardActive={isCardActive} />
        </AnimatedIcon>
        <Link href={`/users/${username}`} passHref>
          <UserBar>
            <AvatarWrapper>
              <Avatar src={avatar!} layout="fill" alt="avatar" />
            </AvatarWrapper>
            <Username>{username}</Username>
          </UserBar>
        </Link>
        <RatingBar>
          <RatingWrapper>
            <AnimatedIcon
              text="Dislike"
              hovercolor={
                areRatingsActive.dislikes
                  ? "var(--color-distinct-light)"
                  : "var(--color-secondary-light)"
              }
              onClick={() => {
                areRatingsActive.dislikes
                  ? handleRatingClick("cancel")
                  : handleRatingClick("dislike");
              }}
            >
              <SadIconPreview
                isCardActive={isCardActive}
                isClicked={areRatingsActive.dislikes}
              />
            </AnimatedIcon>
            <RatingCounter>{ratingsNum.dislikes}</RatingCounter>
          </RatingWrapper>
          <RatingWrapper>
            <AnimatedIcon
              text="Like"
              hovercolor={
                areRatingsActive.likes
                  ? "var(--color-distinct-light)"
                  : "var(--color-secondary-light)"
              }
              onClick={() => {
                areRatingsActive.likes
                  ? handleRatingClick("cancel")
                  : handleRatingClick("like");
              }}
            >
              <HappyIconPreview
                isCardActive={isCardActive}
                isClicked={areRatingsActive.likes}
              />
            </AnimatedIcon>
            <RatingCounter>{ratingsNum.likes}</RatingCounter>
          </RatingWrapper>
        </RatingBar>
      </Footer>
    </PreviewCard>
  );
};

const storyClick = keyframes`
  from {
    background: var(--color-gray-1000);
  }
  to {
    background: var(--color-gray-800);
  }
`;

export const Card = styled.div`
  padding-inline: 8px;
  padding-block: 4px 16px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 2px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: var(--shadow-elevation-low);
  width: 100%;

  @media ${phoneAndSmaller} {
    width: 100%;
  }
`;

const LinkWrapper = styled.a`
  text-decoration: none;
  flex: 1;
`;

const PreviewCard = styled(Card)`
  background: ${({ isCardActive }: PreviewCardProps) =>
    isCardActive ? "var(--color-gray-800)" : "var(--color-gray-1000)"};
  animation: ${({ isCardActive }: PreviewCardProps) =>
      isCardActive ? storyClick : null}
    0.5s;
  height: 450px;

  @media ${tabletAndSmaller} {
    height: 330px;
  }
`;

const Title = styled.h1`
  color: var(--color-font-black);
  font-size: clamp(0.8rem, 3vw, 1.5rem);
  justify-self: start;
`;

const Header = styled.div`
  display: grid;
  gap: 0 4px;
  grid-template-columns: 1fr fit-content(220px);
  justify-content: space-between;
  place-items: center;
`;

const RightHeader = styled.div`
  width: 100%;
  justify-self: end;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SuperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -16px;
`;

const Time = styled.p`
  color: var(--color-secondary);
  cursor: default;
  width: fit-content;
`;

const Content = styled.p`
  font-size: 1.1rem;
  white-space: pre-line;
  color: var(--color-font-black);
  flex: 1;

  @media ${tabletAndSmaller} {
    font-size: 0.9rem;
  }
`;

const ContentPreview = styled(Content)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;

  @media ${tabletAndSmaller} {
    -webkit-line-clamp: 8;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  justify-items: start;
  align-items: center;
`;

const CopyIcon = styled(Copy)`
  width: calc(var(--icons-size) - 5px);
  height: calc(var(--icons-size) - 5px);
  position: relative;
  z-index: 1;
  color: var(--color-secondary);
  background: var(--color-gray-1000);
`;

const CopyIconPreview = styled(CopyIcon)`
  background: ${({ isCardActive }: PreviewCardProps) =>
    isCardActive ? "transparent" : "var(--color-gray-1000)"};
`;

const HappyIcon = styled(Happy)`
  width: var(--icons-size);
  height: var(--icons-size);
  color: ${({ isClicked }: RatingIconsProps) =>
    isClicked ? "var(--color-distinct)" : "var(--color-secondary)"};
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
  color: ${({ isClicked }: RatingIconsProps) =>
    isClicked ? "var(--color-distinct)" : "var(--color-secondary)"};
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
  min-width: max-content;
  text-decoration: none;
  justify-self: center;

  &:hover {
    text-decoration: underline var(--color-distinct);
  }
`;

const AvatarWrapper = styled.a`
  position: relative;

  width: calc(var(--icons-size));
  height: calc(var(--icons-size));
`;

const Avatar = styled(Image)`
  border-radius: 50%;
`;

const Username = styled.p`
  font-size: 1rem;
  color: var(--color-secondary);
  padding-top: 5px;

  @media ${tabletAndSmaller} {
    font-size: 0.7rem;
  }
`;

const RatingBar = styled.div`
  justify-self: end;
`;

const RatingWrapper = styled.span`
  display: inline-block;
  position: relative;
`;

const RatingCounter = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  transform: translateY(-50%);
  font-size: 0.8rem;
  width: fit-content;
  padding-right: 1px;
  color: var(--color-background);

  @media ${phoneAndSmaller} {
    padding-right: 0px;
    font-size: 0.6rem;
  }
`;

const Tags = styled.ul`
  height: 100%;
  display: grid;
  max-width: 186px;
  gap: 0 8px;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  list-style-type: none;
  padding: 0;
  margin: 0;

  @media ${tabletAndSmaller} {
    max-width: 140px;
    gap: 0 4px;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
`;

const Tag = styled.li``;

const A = styled.a`
  color: var(--color-distinct);
  font-size: 0.8rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media ${tabletAndSmaller} {
    font-size: 0.6rem;
  }
`;
