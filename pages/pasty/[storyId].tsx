import styled from "styled-components";

import { useEffect, useState, useContext } from "react";

import Head from "next/head";
import Image from "next/image";

import { getStoryById, getUserById } from "../../utils/firebase.utils";

import Layout from "../../components/layout.component";
import StoryCard from "../../components/story-card.component";

import { StoryCardType, UserDoc, Story } from "../../utils/types.utils";
import MainOverlay from "../../components/main-overlay-component";

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
      <MainOverlay>
        <MaxWidthWrapper>
          <StoryCard full story={story} user={user} />
        </MaxWidthWrapper>
      </MainOverlay>
    </Layout>
  );
}

const MaxWidthWrapper = styled.div`
  padding-block: 32px;
  width: min(100%, 700px);
  margin: 0 auto;
`;
