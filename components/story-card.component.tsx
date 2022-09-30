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

import { UserContext } from "../contexts/user.context";
import { EventsContext } from "../contexts/events.context";

import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { Person } from "@styled-icons/bootstrap/Person";
import { BookmarkFill } from "@styled-icons/bootstrap/BookmarkFill";
import { Bookmark } from "@styled-icons/bootstrap/Bookmark";

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

export default function StoryCard({
  full,
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
}: Props) {
  const {
    isLoggedIn,
    user: { uid: ClientsUid },
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

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  useEffect(() => {
    if (isLoggedIn) {
      getStoryRatings(id, ClientsUid).then((data: any) => {
        setAreRatingsActive(data);
      });
    } else {
      setAreRatingsActive({ likes: false, dislikes: false });
    }
  }, [isLoggedIn, id, ClientsUid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    dispatchEvents({ type: "alert", payload: "pasty/copy" });
  };

  const handleRatingClick = async (action: string) => {
    if (isLoggedIn) {
      setAreRatingsActive(await updateStoryRating(id, ClientsUid, action));
      setRatingsNum(await getStoryRatingsNum(id));
    } else {
      dispatchEvents({ type: "alert", payload: "pasty/not-logged" });
    }
  };

  useEffect(() => console.log(!!tags[0]), []);

  const StoryCardPreview = () => {
    const [isCardActive, setIsCardActive] = useState<boolean>(false);
    return (
      <PreviewCard isCardActive={isCardActive} className={className}>
        <SuperHeader>
          <Time>{formatter.format(new Date(created))}</Time>
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
                        query: { tag },
                      }}
                      passHref
                    >
                      <A>#{tag}</A>
                    </Link>
                  </Tag>
                ))}
              </Tags>
            )}
            {isLoggedIn && (
              <StoryCardDropdownStyled id={id} isCardActive={isCardActive} />
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
              <Avatar src={avatar!} width={40} height={40} alt="avatar" />
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

  const StoryCardFull = () => (
    <Card className={className}>
      <SuperHeader>
        <Time>{formatter.format(new Date(created))}</Time>
      </SuperHeader>
      <Header>
        <Title>{title}</Title>
        {isLoggedIn && <StoryCardDropdown id={id} />}
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
            <Avatar src={avatar!} width={40} height={40} alt="avatar" />
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
            <RatingCounter>{dislikes}</RatingCounter>
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
            <RatingCounter>{likes}</RatingCounter>
          </RatingWrapper>
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
  padding-block: 4px 16px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 2px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: var(--shadow-elevation-low);
  min-height: 450px;
  width: 100%;
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
  height: 450x;
`;

const Title = styled.h1`
  color: var(--color-font-black);
  font-size: 1.8rem;
  justify-self: start;
`;

const Header = styled.div`
  display: grid;
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
  display: grid;
  place-items: center;
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
`;

const ContentPreview = styled(Content)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
`;

const Footer = styled.footer`
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  justify-items: start;
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
  text-decoration: none;
  justify-self: center;

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
`;

const Tags = styled.ul`
  height: 100%;
  display: grid;
  max-width: 168px;
  gap: 0 8px;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Tag = styled.li``;

const StoryCardDropdownStyled = styled(StoryCardDropdown)`
  margin-left: auto;
`;

const A = styled.a`
  color: var(--color-distinct);
  font-size: 0.8rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
