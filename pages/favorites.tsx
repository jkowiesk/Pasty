import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import Layout from "../components/layout.component";

import { UserContext } from "../contexts/user.context";
import { useRouter } from "next/router";
import { getFavoriteStoryCards, getFireUser } from "../utils/firebase.utils";
import { StoryCardType } from "../utils/types.utils";
import StoryCard from "../components/story-card.component";
import { StoryCardLoading } from "../components/story-card-loading.component";

type Props = {};

type Event = React.FormEvent<HTMLInputElement>;

export default function Settings() {
  const {
    isLoggedIn,
    user: { uid },
  } = useContext(UserContext);
  const router = useRouter();
  const [storyCards, setStoryCards] = useState<StoryCardType[]>([]);

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else {
      getFavoriteStoryCards(uid).then((data) => setStoryCards(data));
    }
  }, [isLoggedIn, uid, router]);

  return (
    <Layout>
      <Overlay>
        <LeftSide></LeftSide>
        <Main>
          <MaxWidthWrapper>
            {storyCards.length ? (
              storyCards.map(({ story, user }: StoryCardType, idx) => (
                <StoryCard key={idx} story={story} user={user} />
              ))
            ) : (
              <>
                <StoryCardLoading />
                <StoryCardLoading />
              </>
            )}
          </MaxWidthWrapper>
        </Main>
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

const Main = styled.div`
  grid-area: main;
`;

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
