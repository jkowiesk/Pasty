import { useEffect, useState } from "react";
import styled from "styled-components";

import { Story, StoryDoc, User, UserDoc } from "../utils/types.utils";

import { getUserById } from "../utils/firebase.utils";

import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { Person } from "@styled-icons/bootstrap/Person";

import { Happy } from "@styled-icons/boxicons-regular/Happy";
import { Sad } from "@styled-icons/boxicons-regular/Sad";

import Image from "next/image";
import Link from "next/link";

import AnimatedIcon from "./animated-icon.component";

type Props = {
  story: Story;
  user: UserDoc;
  className?: any;
};

type SimpleUser = {
  username: string;
  avatar: string;
};

export default function StoryCard({
  story: { id, title, uid, content },
  user: { username, avatar },
  className,
}: Props) {
  return username ? (
    <Card className={className}>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{content}</Content>
      <Footer>
        <AnimatedIcon text="Copy" onHoverColor="var(--color-secondary-light)">
          <CopyIcon />
        </AnimatedIcon>
        <Link href={`/users/${username}`}>
          <UserBar>
            <Avatar src={avatar!} width={40} height={40} alt="avatar" />
            <Username>{username}</Username>
          </UserBar>
        </Link>
        <RatingBar>
          <AnimatedIcon
            text="Dislike"
            onHoverColor="var(--color-secondary-light)"
          >
            <SadIcon />
          </AnimatedIcon>
          <AnimatedIcon text="Like" onHoverColor="var(--color-secondary-light)">
            <HappyIcon />
          </AnimatedIcon>
        </RatingBar>
      </Footer>
    </Card>
  ) : null;
}

const Card = styled.div`
  padding-inline: 8px;
  padding-block: 16px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 1px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: var(--shadow-elevation-low);
`;

const Title = styled.h1`
  color: var(--color-font-black);
`;

const Header = styled.div``;

const Content = styled.p`
  font-size: 1.1rem;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
  color: var(--color-font-black);
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconBtn = styled.button`
  padding: 5px;
  border: 0;
  background: transparent;
  color: var(--color-secondary);
  cursor: pointer;
`;

const CopyIcon = styled(Copy)`
  width: calc(var(--icons-size) - 5px);
  height: calc(var(--icons-size) - 5px);
  position: relative;
  color: var(--color-secondary);
  background: var(--color-gray-1000);
  z-index: 1;
`;

const HappyIcon = styled(Happy)`
  width: var(--icons-size);
  height: var(--icons-size);
  position: relative;
  color: var(--color-secondary);
  background: var(--color-gray-1000);
  z-index: 1;
`;

const SadIcon = styled(Sad)`
  width: var(--icons-size);
  height: var(--icons-size);
  position: relative;
  color: var(--color-secondary);
  background: var(--color-gray-1000);
  z-index: 1;
`;

const UserBar = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
`;

const Username = styled.p`
  color: var(--color-secondary);
  padding-top: 5px;
`;

const PersonIcon = styled(Person)`
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
`;

const RatingBar = styled.div``;
