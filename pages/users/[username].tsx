import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import Layout from "../../components/layout.component";
import { Card } from "../../components/card.component";

import Image from "next/image";

import {
  getFollowersNum,
  getFollows,
  getIsFollowing,
  getStoriesByUid,
  getUserByUsername,
  updateFollower,
} from "../../utils/firebase.utils";
import {
  Story,
  UserProfile,
  AchievementName,
  UserSimple,
} from "../../utils/types.utils";

import StoryCard from "../../components/story-card.component";
import CustomBtn from "../../components/custom-btn.component";

import { Mask } from "@styled-icons/entypo/Mask";
import { UserContext } from "../../contexts/user.context";
import { EventsContext } from "../../contexts/events.context";
import { achievementsMap } from "../../utils/objects.utils";
import { useRouter } from "next/router";
import Link from "next/link";

import { phoneAndSmaller, tabletAndSmaller } from "../../utils/constants.utils";

type Props = { profileUser: UserProfile; stories: Story[] };
type StyleProps = { isFollowing: boolean };

export async function getServerSideProps({ params: { username } }: any) {
  const profileUser = await getUserByUsername(username);

  const { uid, avatar, followers, achievements } = profileUser;
  const stories = await getStoriesByUid(profileUser.uid);
  const follows = await getFollows(profileUser.uid);
  return {
    props: {
      profileUser: { uid, username, avatar, followers, achievements, follows },
      stories,
    },
  };
}

export default function Profile({ profileUser, stories }: Props) {
  const {
    isLoggedIn,
    user: { uid: clientUid },
  } = useContext(UserContext);

  const { dispatchEvents } = useContext(EventsContext);

  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followersNum, setFollowersNum] = useState<number>(
    profileUser.followers.length
  );

  useEffect(() => {
    if (isLoggedIn)
      getIsFollowing(clientUid, profileUser.uid).then((data) =>
        setIsFollowing(data)
      );
    getFollowersNum(profileUser.uid).then((data) => setFollowersNum(data));
  }, [isLoggedIn, profileUser, clientUid]);

  const handleFollowBtnClick = async () => {
    if (!isLoggedIn) {
      dispatchEvents({ type: "alert", payload: "pasty/not-logged" });
      return;
    }
    const followers = await updateFollower(clientUid, profileUser.uid);

    if (followers === -1) {
      dispatchEvents({ type: "alert", payload: "pasty/follow/self" });
      return;
    }
    setFollowersNum(followers);
    setIsFollowing(await getIsFollowing(clientUid, profileUser.uid));
  };

  return (
    <Layout>
      <MaxWidth>
        <ProfileOverlay>
          <HeaderCard>
            <ProfileInfo>
              <ImageWrapper>
                <Avatar
                  src={profileUser.avatar!}
                  layout="fill"
                  priority={true}
                />
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
            </ProfileInfo>
          </HeaderCard>
          <Sidebar>
            <SlideCard>
              <SideCardTitle>Achievements</SideCardTitle>
              <SideCardWrapper>
                {profileUser.achievements.map((achievement, idx) => (
                  <label key={idx} title={achievement}>
                    <SideCardElement>
                      <Image
                        src={achievementsMap[achievement]}
                        layout="fill"
                        alt="first_achievement"
                      />
                    </SideCardElement>
                  </label>
                ))}
              </SideCardWrapper>
            </SlideCard>
            <SlideCard>
              <SideCardTitle>Follows</SideCardTitle>
              <SideCardWrapper>
                {profileUser.follows.map((idol: UserSimple, idx) => (
                  <label key={idx} title={idol.username}>
                    <Link href={`/users/${idol.username}`}>
                      <a>
                        <SideCardElement>
                          <FollowAvatar
                            src={idol.avatar}
                            layout="fill"
                            alt="first_achievement"
                          />
                        </SideCardElement>
                      </a>
                    </Link>
                  </label>
                ))}
              </SideCardWrapper>
            </SlideCard>
          </Sidebar>
          <StoriesBar>
            {stories.map((story, idx) => (
              <StoryCard key={idx} story={story} user={profileUser} />
            ))}
          </StoriesBar>
        </ProfileOverlay>
      </MaxWidth>
    </Layout>
  );
}

const ProfileOverlay = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "achievements stories";
  grid-template-rows: 300px 1fr;
  grid-template-columns: 1fr 1fr;
  place-items: center;

  @media ${tabletAndSmaller} {
    grid-template-areas:
      "header"
      "achievements"
      "stories";
    grid-template-rows: 300px auto 1fr;
    grid-template-columns: 1fr;
  }
`;

const MaxWidth = styled.div`
  width: 100%;
  padding-inline: 6%;

  @media ${phoneAndSmaller} {
    padding-inline: 3%;
  }

  --story-card-width: 500px;
`;

const HeaderCard = styled(Card)`
  grid-area: header;
  height: 74%;
  width: 100%;
  padding-inline: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${tabletAndSmaller} {
    padding-inline: 32px;
  }

  @media ${phoneAndSmaller} {
    padding-inline: 16px;
  }
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-template-areas:
    "avatar basicInfo"
    "avatar followBtn";
  place-items: center;
  height: 128px;
  grid-template-rows: 1fr 40px;
  gap: 16px;

  @media ${phoneAndSmaller} {
    gap: 8px;
    grid-template-rows: 1fr 40px;
    justify-content: space-between;
    margin: auto;
    width: 100%;
  }
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
  position: sticky;
  top: 135px;

  @media ${tabletAndSmaller} {
    width: 90%;
    padding-right: 0;
    position: relative;
    top: 0;
    margin-inline: auto;
  }
`;

const StoriesBar = styled.div`
  grid-area: stories;
  width: 100%;
  padding-left: 10%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 32px;

  @media ${tabletAndSmaller} {
    max-width: var(--story-card-width);
    padding: 32px 20px;
    top: 0;
    margin-inline: auto;
  }
`;
const Avatar = styled(Image)``;

const FollowAvatar = styled(Image)`
  border-radius: 50%;
`;

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

  @media ${phoneAndSmaller} {
    font-size: 0.9rem;
  }
`;

const Username = styled.h3`
  font-size: 1.5rem;
  color: var(--color-primary-dark);

  @media ${phoneAndSmaller} {
    font-size: 1.2rem;
  }
`;

const FollowButton = styled(CustomBtn)`
  grid-area: followBtn;
  height: 100%;
  padding-inline: 24px;
  align-self: end;
  justify-self: start;
  width: 200px;
  background: ${({ isFollowing }: StyleProps) =>
    isFollowing ? "var(--color-distinct-light)" : "var(--color-primary)"};

  @media ${phoneAndSmaller} {
    width: 150px;
  }
`;

const MaskIcon = styled(Mask)`
  width: 25px;
  height: 25px;

  @media ${phoneAndSmaller} {
    width: 150px;
  }
`;

const SideCardWrapper = styled.section`
  display: flex;
  width: 100%;
  padding-inline: 10%;
  gap: 32px;
`;

const SlideCard = styled(Card)`
  width: 100%;
  height: fit-content;
  padding-bottom: 32px;
`;
const SideCardTitle = styled.h2`
  color: var(--color-primary-dark);
  width: 100%;
  text-align: center;
  padding-block: 10px;
`;

const SideCardElement = styled.div`
  position: relative;
  width: calc(var(--icons-size));
  height: calc(var(--icons-size));
`;

const SideCardLink = styled.a`
  position: relative;
  width: 40px;
  height: 40px;
`;
