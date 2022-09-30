import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import Layout from "../components/layout.component";

import { UserContext } from "../contexts/user.context";
import { useRouter } from "next/router";
import { getFavoriteStoryCards, getFireUser } from "../utils/firebase.utils";
import { StoryCardType } from "../utils/types.utils";
import StoryCard from "../components/story-card.component";
import { StoryCardLoading } from "../components/story-card-loading.component";
import MainOverlay from "../components/main-overlay-component";

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
      <MainOverlay>
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
