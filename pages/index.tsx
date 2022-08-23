import styled from "styled-components";

import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";

import { getStoriesForHome } from "../utils/firebase.utils";

import Layout from "../components/layout.component";
import StoryCard from "../components/story-card.component";
import AddStoryBtn from "../components/add-story-btn.component";
import StoryDialog from "../components/story-dialog.component";

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
  const [isStoryDialogOpen, setStoryDialogOpen] = useState<boolean>(false);

  return (
    <Layout>
      <MaxWidthWrapper>
        <>
          {stories.map((story, idx) => (
            <StoryCard key={idx} story={story}>
              {story.content}
            </StoryCard>
          ))}
        </>
      </MaxWidthWrapper>
      <AddStoryBtn setIsOpen={setStoryDialogOpen} />
      <StoryDialog isOpen={isStoryDialogOpen} setIsOpen={setStoryDialogOpen} />
    </Layout>
  );
}

const MaxWidthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(100%, 700px);
  margin: 0 auto;
`;
