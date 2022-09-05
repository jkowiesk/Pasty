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
  const handleFollowBtnClick = () => {};

  return (
    <Layout>
      <MaxWidth>
        <Overlay>
          <HeaderCard>
            <LeftSide>
              <ImageWrapper>
                <Avatar src={profileUser.avatar!} layout="fill" />
              </ImageWrapper>
              <FollowersCount>Followers: 9999</FollowersCount>
              <FollowButton onClick={handleFollowBtnClick} text="Follow">
                <MaskIcon />
              </FollowButton>
            </LeftSide>
          </HeaderCard>
          <Sidebar>
            <AchievementsCard>
              <AchievementsTitle>Achievements</AchievementsTitle>
              <MaxWidth>
                <Achievements>achievement</Achievements>
              </MaxWidth>
            </AchievementsCard>
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
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: grid;
  grid-template-areas:
    "avatar followers"
    "avatar followBtn";
  place-items: center;
  height: 128px;
  grid-template-rows: 1fr 40px;
  gap: 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
  grid-area: avatar;
  height: 128px;
  width: 128px;
`;

const Sidebar = styled.div`
  grid-area: achievements;
  align-self: start;
  width: 100%;
  padding-right: 10%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StoriesBar = styled.div`
  grid-area: stories;
  width: 100%;
  padding-left: 10%;
`;

const MaxWidth = styled.div`
  width: 100%;
  padding-inline: 10%;
`;

const AchievementsCard = styled(Card)`
  width: 100%;
  height: 100px;
`;

const Avatar = styled(Image)``;

const FollowersCount = styled.p`
  font-size: 1.2rem;
  grid-area: followers;
  color: var(--color-primary-dark);
`;

const FollowButton = styled(CustomBtn)`
  grid-area: followBtn;
  background: var(--color-primary);
  height: 100%;
  padding-inline: 24px;
  align-self: end;
`;

const MaskIcon = styled(Mask)`
  width: 25px;
  height: 25px;
`;

const AchievementsTitle = styled.h2`
  color: var(--color-primary-dark);
  width: 100%;
  text-align: center;
  padding-block: 10px;
`;

const Achievements = styled.div``;