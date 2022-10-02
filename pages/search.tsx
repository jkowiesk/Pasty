import styled from "styled-components";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Layout from "../components/layout.component";

import { UserContext } from "../contexts/user.context";
import { useRouter } from "next/router";
import {
  getFavoriteStoryCards,
  getFireUser,
  getUserById,
} from "../utils/firebase.utils";
import { Story, StoryCardType, User } from "../utils/types.utils";
import StoryCard from "../components/story-card.component";
import { StoryCardLoading } from "../components/story-card-loading.component";
import MainOverlay from "../components/main-overlay-component";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = { tags: string[] };

type Event = React.FormEvent<HTMLInputElement>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let tags: string[] | string = context.query.tags!;
  if (typeof tags === "string") {
    tags = [tags];
  }
  return { props: { tags } };
};

export default function Search({ tags }: Props) {
  const [storyCards, setStoryCards] = useState<StoryCardType[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isObserverOn = useRef<boolean>(false);

  const observer = useRef<IntersectionObserver>();
  const lastStoryRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
          isObserverOn.current = true;
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (!isObserverOn.current) return;
    setIsLoading(true);
    console.log(
      "/api/search?" + new URLSearchParams(tags.map((tag) => ["tags", tag]))
    );
    const fetchData = async () => {
      await fetch(
        "/api/search?" + new URLSearchParams(tags.map((tag) => ["tags", tag])),
        {
          method: "POST",
          body: JSON.stringify(
            storyCards.map((storyCard) => storyCard.story.id)
          ),
        }
      )
        .then((res) => res.json())
        .then(async (stories) => {
          console.log(stories);
          let storyCards: StoryCardType[] = [];
          for (let story of stories) {
            const { uid, username, avatar } = (await getUserById(
              story.uid
            )) as User;
            storyCards.push({ story, user: { uid, username, avatar } });
          }
          setStoryCards((prevStoryCards: StoryCardType[]) => [
            ...prevStoryCards,
            ...storyCards,
          ]);
          setHasMore(storyCards.length > 0);
        })
        .catch((e) => console.log(e));

      setIsLoading(false);
    };

    fetchData();
  }, [pageNum]);

  return (
    <Layout>
      <MainOverlay>
        <MaxWidthWrapper>
          {storyCards.length ? (
            storyCards.map(({ story, user }: StoryCardType, idx) => (
              <StoryCard key={idx} story={story} user={user} />
            ))
          ) : (
            <>
              <StoryCardLoading ref={lastStoryRef} />
              <StoryCardLoading />
            </>
          )}
        </MaxWidthWrapper>
      </MainOverlay>
    </Layout>
  );
}

const MaxWidthWrapper = styled.div`
  display: flex;
  padding-block: 32px;
  gap: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(100%, 700px);
  margin: 0 auto;
`;
