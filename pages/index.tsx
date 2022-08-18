import styled from "styled-components";

import Head from "next/head";
import Image from "next/image";

import { getStoriesForHome } from "../utils/firebase.utils";

import Layout from "../components/Layout";
import StoryCard from "../components/StoryCard";
import { Story } from "../utils/types.utils";

export async function getServerSideProps() {
  const stories = await getStoriesForHome();

  return {
    props: { stories },
  };
}

type Props = {
  stories: Story[];
};

export default function Home({ stories }: Props) {
  return (
    <Layout>
      <>
        {stories.map((story, idx) => (
          <StoryCard key={idx} story={story}>
            {story.content}
          </StoryCard>
        ))}
      </>
    </Layout>
  );
}
