import styled from "styled-components";

import { useEffect, useState, useContext } from "react";

import { UserContext } from "../contexts/user.context";

import Head from "next/head";
import Image from "next/image";

import { getStoriesForHome, getUserById } from "../utils/firebase.utils";

import Layout from "../components/layout.component";
import StoryCard from "../components/story-card.component";
import AddStoryBtn from "../components/add-story-btn.component";
import StoryDialog from "../components/story-dialog.component";

import { StoryCardType, UserDoc } from "../utils/types.utils";
import { EventsContext } from "../contexts/events.context";

export async function getServerSideProps() {
  const stories = await getStoriesForHome();
  let storyCards: StoryCardType[] = [];

  for (let story of stories) {
    const user = (await getUserById(story.uid)) as UserDoc;
    storyCards.push({ story, user });
  }

  return {
    props: { storyCards },
  };
}

type Props = {
  storyCards: StoryCardType[];
};

export default function Home({ storyCards }: Props) {
  const [isStoryDialogOpen, setStoryDialogOpen] = useState<boolean>(false);

  const { isLoggedIn } = useContext(UserContext);

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
