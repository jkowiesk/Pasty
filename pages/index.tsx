import styled from "styled-components";

import { useEffect, useState, useContext, useCallback, useRef } from "react";

import { UserContext } from "../contexts/user.context";

import Head from "next/head";
import Image from "next/image";

import { getStoriesForHome, getUserById } from "../utils/firebase.utils";

import Layout from "../components/layout.component";
import StoryCard from "../components/story-card.component";
import AddStoryBtn from "../components/add-story-btn.component";
import StoryDialog from "../components/story-dialog.component";

import { StoryCardType, User, UserDoc, UserSimple } from "../utils/types.utils";
import { EventsContext } from "../contexts/events.context";
import { HomeContext } from "../contexts/home.context";
import { StoryCardLoading } from "../components/story-card-loading.component";

export async function getServerSideProps() {
  const stories = await getStoriesForHome();
  let storyCards: StoryCardType[] = [];

  for (let story of stories) {
    const { uid, username, avatar } = (await getUserById(story.uid)) as User;
    storyCards.push({ story, user: { uid, username, avatar } });
  }

  return {
    props: { storyCards },
  };
}

type Props = {
  storyCards: StoryCardType[];
};

export default function Home({}) {
  const [isStoryDialogOpen, setStoryDialogOpen] = useState<boolean>(false);

  const { isLoggedIn } = useContext(UserContext);
  const { storyCards, setStoryCards } = useContext(HomeContext);
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
    fetch("/api/", {
      method: "POST",
      body: JSON.stringify(storyCards.map((storyCard) => storyCard.story.id)),
    })
      .then((res) => res.json())
      .then(async (stories) => {
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
      });
    setIsLoading(false);
  }, [pageNum]);

  const {
    redirect: { isActive },
    dispatchEvents,
  } = useContext(EventsContext);

  useEffect(() => {
    if (isActive) {
      dispatchEvents({ type: "redirect", payload: "pasty/end" });
      dispatchEvents({ type: "alert", payload: "pasty/logged-in" });
    }
  }, []);

  return (
    <Layout>
      <Overlay>
        <LeftSide></LeftSide>
        <Main>
          <MaxWidthWrapper>
            <>
              {storyCards.map(({ story, user }: StoryCardType, idx) => (
                <StoryCard key={idx} story={story} user={user} />
              ))}
              <StoryCardLoading ref={lastStoryRef} />
              <StoryCardLoading />
              <StoryCardLoading />
            </>
          </MaxWidthWrapper>
        </Main>
        <>{isLoggedIn && <AddStoryBtn setIsOpen={setStoryDialogOpen} />}</>
        <StoryDialog
          isOpen={isStoryDialogOpen}
          setIsOpen={setStoryDialogOpen}
        />
        <RightSide></RightSide>
      </Overlay>
    </Layout>
  );
}

const Overlay = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: 1fr minmax(40ch, 3.5fr) 1fr;
`;

const LeftSide = styled.div`
  grid-area: left;
`;

const Main = styled.div``;

const RightSide = styled.div`
  grid-area: right;
`;

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
