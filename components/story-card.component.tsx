import { useEffect, useState } from "react";
import styled from "styled-components";
import { StoryDoc, User, UserDoc } from "../utils/types.utils";

import { getUserById } from "../utils/firebase.utils";

import { Copy } from "@styled-icons/boxicons-regular/Copy";
import { Person } from "@styled-icons/bootstrap/Person";

import { Happy } from "@styled-icons/boxicons-regular/Happy";
import { Sad } from "@styled-icons/boxicons-regular/Sad";

import Image from "next/image";
import Link from "next/link";

type Props = {
  story: StoryDoc;
  children: string;
};

export default function StoryCard({ story: { title, uid }, children }: Props) {
  const [user, setUser] = useState<UserDoc>({
    username: "",
    avatar: "",
  });

  useEffect(() => {
    getUserById(uid).then((data) => setUser(data as UserDoc));
  }, []);

  return user.username ? (
    <Card>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <IconBtn>
          <CopyIcon />
        </IconBtn>
        <Link href={`/users/${user.username}`}>
          <UserBar>
            <Avatar src={user.avatar!} width={40} height={40} alt="avatar" />
            <Username>{user.username}</Username>
          </UserBar>
        </Link>
        <RatingBar>
          <IconBtn>
            <SadIcon />
          </IconBtn>
          <IconBtn>
            <HappyIcon />
          </IconBtn>
        </RatingBar>
      </Footer>
    </Card>
  ) : null;
}

const Card = styled.div`
  margin: 16px;
  padding: 8px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 1px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1``;

const Header = styled.div``;

const Content = styled.p`
  font-size: 1.1rem;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
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
`;

const PersonIcon = styled(Person)`
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
`;

const RatingBar = styled.div``;

const HappyIcon = styled(Happy)`
  width: var(--icons-size);
  height: var(--icons-size);
`;

const SadIcon = styled(Sad)`
  width: var(--icons-size);
  height: var(--icons-size);
`;
