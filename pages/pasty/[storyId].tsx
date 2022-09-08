import styled from "styled-components";

import { useEffect, useState, useContext } from "react";

import Head from "next/head";
import Image from "next/image";

import { getStoryById, getUserById } from "../../utils/firebase.utils";

import Layout from "../../components/layout.component";
import StoryCard from "../../components/story-card.component";

import { StoryCardType, UserDoc, Story } from "../../utils/types.utils";

export async function getServerSideProps({ params: { storyId } }: any) {
  const story = await getStoryById(storyId);
  const user = await getUserById(story.uid);

  return {
    props: { storyCard: { story, user } },
  };
}

type Props = {
  storyCard: StoryCardType;
};

export default function StoryPage({ storyCard: { story, user } }: Props) {
  return (
    <Layout>
      <Overlay>
        <LeftSide></LeftSide>
        <Main>
          <MaxWidthWrapper>
            <StoryCard full story={story} user={user} />
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

const Main = styled.div``;

const RightSide = styled.div`
  grid-area: right;
`;

const MaxWidthWrapper = styled.div`
  padding-block: 32px;
  width: min(100%, 700px);
  margin: 0 auto;
`;
