import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import Layout from "../../components/layout.component";
import { Card } from "../../components/card.component";

import Image from "next/image";

import {
  getIsFollowing,
  getStoriesByUid,
  getUserByUsername,
  updateFollower,
} from "../../utils/firebase.utils";
import { Story, UserProfile } from "../../utils/types.utils";

import StoryCard from "../../components/story-card.component";
import CustomBtn from "../../components/custom-btn.component";

import { Mask } from "@styled-icons/entypo/Mask";
import { UserContext } from "../../contexts/user.context";

type Props = { profileUser: UserProfile; stories: Story[] };
type StyleProps = { isFollowing: boolean };

export async function getServerSideProps({ params: { username } }: any) {
  const profileUser = await getUserByUsername(username);
  const { uid, avatar, followers } = profileUser;
  const stories = await getStoriesByUid(profileUser.uid);

  return {
    props: { profileUser: { uid, username, avatar, followers }, stories },
  };
}

export default function Profile({ profileUser, stories }: Props) {
  const {
    isLoggedIn,
    user: { uid: clientUid },
  } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followersNum, setFollowersNum] = useState<number>(
    profileUser.followers.length
  );

  useEffect(() => {
    if (isLoggedIn)
      getIsFollowing(clientUid, profileUser.uid).then((data) =>
        setIsFollowing(data)
      );
  }, [isLoggedIn]);

  const handleFollowBtnClick = async () => {
    setFollowersNum(await updateFollower(clientUid, profileUser.uid));
    setIsFollowing(await getIsFollowing(clientUid, profileUser.uid));
  };

  return (
    <Layout>
      <MaxWidth>
        <Overlay>
          <HeaderCard>
            <LeftSide>
              <ImageWrapper>
                <Avatar src={profileUser.avatar!} layout="fill" />
              </ImageWrapper>
              <BasicInfo>
                <Username>{profileUser.username}</Username>
                <FollowersCount>Followers: {followersNum}</FollowersCount>
              </BasicInfo>
              <FollowButton
                isFollowing={isFollowing}
                onClick={handleFollowBtnClick}
                text="Follow"
              >
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
                <StoryCard key={idx} story={story} user={profileUser} />
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
    "avatar basicInfo"
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
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 32px;
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

const BasicInfo = styled.div`
  grid-area: basicInfo;
  justify-self: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FollowersCount = styled.p`
  font-size: 1.2rem;
  color: var(--color-secondary);
`;

const Username = styled.h3`
  font-size: 1.5rem;
  color: var(--color-primary-dark);
`;

const FollowButton = styled(CustomBtn)`
  grid-area: followBtn;
  height: 100%;
  padding-inline: 24px;
  align-self: end;
  width: 200px;
  background: ${({ isFollowing }: StyleProps) =>
    isFollowing ? "var(--color-distinct-light)" : "var(--color-primary)"};
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
