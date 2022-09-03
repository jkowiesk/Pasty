import styled from "styled-components";

import Layout from "../../components/layout.component";
import { Card } from "../../components/card.component";

import Image from "next/image";

import { getStoriesByUid, getUserByUsername } from "../../utils/firebase.utils";
import { Story, User, UserDoc } from "../../utils/types.utils";

import StoryCard from "../../components/story-card.component";
import CustomBtn from "../../components/custom-btn.component";

import { Mask } from "@styled-icons/entypo/Mask";

type Props = { profileUser: User; stories: Story[] };

export async function getServerSideProps({ params: { username } }: any) {
  const profileUser = await getUserByUsername(username);
  const stories = await getStoriesByUid(profileUser.uid);

  return {
    props: { profileUser, stories },
  };
}

export default function Profile({ profileUser, stories }: Props) {
  return (
    <Layout>
      <MaxWidth>
        <Overlay>
          <HeaderCard>
            <LeftSide>
              <ImageWrapper>
                <Avatar src={profileUser.avatar!} layout="fill" />
              </ImageWrapper>
              <FollowersCount>9999</FollowersCount>
              <FollowButton text="Follow">
                <MaskIcon />
              </FollowButton>
            </LeftSide>
          </HeaderCard>
          <Sidebar>
            <AchievementsCard>dssda</AchievementsCard>
          </Sidebar>
          <StoriesBar>
            <>
              {stories.map((story, idx) => (
                <StoryCard
                  key={idx}
                  story={story}
                  user={profileUser as UserDoc}
                />
              ))}
            </>
          </StoriesBar>
        </Overlay>
      </MaxWidth>
    </Layout>
  );
}

const Overlay = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "achievements stories";
  grid-template-rows: 300px 1fr;
  grid-template-columns: 1fr 1fr;
  place-items: center;

  height: 100%;
`;

const HeaderCard = styled(Card)`
  grid-area: header;
  height: 75%;
  width: 100%;
  padding-inline: 64px;
  display: flex;
`;

const LeftSide = styled.div`
  display: grid;
  grid-template-areas:
    "avatar followers"
    "avatar follow";
  place-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  grid-area: avatar;
  width: 128px;
  height: 128px;
`;

const Sidebar = styled.div`
  grid-area: achievements;
  align-self: start;
  width: 100%;
  padding-right: 10%;
`;

const StoriesBar = styled.div`
  grid-area: stories;
  width: 100%;
  padding-left: 10%;
`;

const MaxWidth = styled.div`
  width: 100%;
  padding-inline: 128px;
`;

const AchievementsCard = styled(Card)`
  margin-block: 16px;
  width: 100%;
  height: 100px;
`;

const Avatar = styled(Image)``;

const FollowersCount = styled.p`
  color: var(--color-secondary);
`;

const FollowButton = styled(CustomBtn)`
  background: var(--color-primary);
`;

const MaskIcon = styled(Mask)`
  width: 30px;
  height: 30px;
`;
