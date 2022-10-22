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
import NoStories from "../components/no-stories.component";

type Props = {};

type Event = React.FormEvent<HTMLInputElement>;

export default function Favorites() {
  const {
    isLoggedIn,
    user: { uid },
  } = useContext(UserContext);
  const router = useRouter();
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [storyCards, setStoryCards] = useState<StoryCardType[]>([]);

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else {
      getFavoriteStoryCards(uid).then((data) => setStoryCards(data));
      setTimeout(() => {
        setFirstLoad(true);
      }, 1000);
    }
  }, [isLoggedIn, uid, router]);

  const FavoritesComponent = () => {
    if (storyCards.length) {
      return (
        <>
          {storyCards.map(({ story, user }: StoryCardType, idx) => (
            <StoryCard key={idx} story={story} user={user} />
          ))}
        </>
      );
    } else if (firstLoad) {
      return <NoStories text="Your favorite list is empty" />;
    }
    return (
      <>
        <StoryCardLoading />
        <StoryCardLoading />
      </>
    );
  };

  return (
    <Layout>
      <MainOverlay>
        <MaxWidthWrapper>
          <FavoritesComponent />
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
