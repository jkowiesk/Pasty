import styled from "styled-components";

import { useEffect, useState, useContext } from "react";

import Head from "next/head";
import Image from "next/image";

import { getDayPasta, getUserById } from "../utils/firebase.utils";

import Layout from "../components/layout.component";
import StoryCard from "../components/story-card.component";

import { StoryCardType, UserDoc, Story } from "../utils/types.utils";
import MainOverlay from "../components/main-overlay-component";

export async function getServerSideProps() {
  const story = await getDayPasta();
  const user = await getUserById(story.uid);

  return {
    props: { storyCard: { story, user } },
  };
}

type Props = {
  storyCard: StoryCardType;
};

const HeaderText = "PASTA OF THE DAY";

export default function DayPastaPage({ storyCard: { story, user } }: Props) {
  return (
    <Layout>
      <MainOverlay>
        <MaxWidthWrapper>
          <Header>
            {[...HeaderText].map((letter, idx) => (
              <Letter key={idx} count={idx}>
                {letter}
              </Letter>
            ))}
          </Header>
          <StoryCard full story={story} user={user} />
        </MaxWidthWrapper>
      </MainOverlay>
    </Layout>
  );
}

const MaxWidthWrapper = styled.div`
  padding-bottom: 32px;
  width: min(100%, 700px);

  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  margin-block: 32px;
`;

const Letter = styled.span`
  font-size: 3rem;
  color: ${({ count }: { count: number }) =>
    count % 2 === 0 ? "var(--color-primary)" : "var(--color-distinct)"};
`;
