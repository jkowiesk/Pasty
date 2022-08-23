import { useContext } from "react";

import styled from "styled-components";

import ImageExperimental from "next/future/image";
import Image from "next/image";

import Link from "next/link";

import { HomeAlt } from "@styled-icons/boxicons-regular/HomeAlt";
import { Person } from "@styled-icons/bootstrap/Person";
import { Menu } from "@styled-icons/boxicons-regular/Menu";

import Logo from "../public/images/logo-header.png";

import { UserContext } from "../contexts/user.context";

type Props = {};

export default function Header() {
  const { isLoggedIn, user } = useContext(UserContext);
  console.log(isLoggedIn);

  return (
    <Wrapper>
      <HomeSide>
        <Link href="/">
          <HomeWrapper>
            <AnimatedText>Home</AnimatedText>
            <HomeIcon />
          </HomeWrapper>
        </Link>
      </HomeSide>
      <LogoWrapper>
        <Image src={Logo} alt="Logo" />
      </LogoWrapper>
      <ActionSide>
        <Actions>
          <Link href={"/sign-in"}>
            <IconWrapper>
              <AnimatedText>{isLoggedIn ? "Profile" : "Sign In"}</AnimatedText>
              {user.avatar ? (
                <Avatar src={user.avatar} alt="avatar" width={40} height={40} />
              ) : (
                <PersonIcon />
              )}
            </IconWrapper>
          </Link>
          <IconWrapper>
            <AnimatedText>Menu</AnimatedText>
            <MenuIcon />
          </IconWrapper>
        </Actions>
      </ActionSide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: var(--color-header);
  grid-area: header;
  display: flex;
  align-items: center;
`;

const Avatar = styled(ImageExperimental)`
  position: relative;
  border-radius: 20px;
  z-index: 1;
`;

const AnimatedText = styled.p`
  position: absolute;
  right: 0;
  left: 0;
  top: 20px;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  font-size: 0.85rem;
`;

const HomeSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const IconWrapper = styled.a`
  isolation: isolate;
  position: relative;
  padding: 5px;

  &:hover {
    cursor: pointer;
  }

  &:hover * a {
    color: var(--color-primary-light);
  }

  &:hover p {
    transform: translateY(80%);
    color: var(--color-primary-light);
    transition: transform 0.6s;
    transition-timing-function: ease-out;
  }
`;

const HomeWrapper = styled(IconWrapper)`
  margin-left: 50px;
`;

const LogoWrapper = styled.div`
  width: 300px;
  padding-bottom: 10px;
`;

const ActionSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-right: 50px;
`;

const HomeIcon = styled(HomeAlt)`
  position: relative;
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
  background: var(--color-header);
  z-index: 1;
`;

const PersonIcon = styled(Person)`
  position: relative;
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
  background: var(--color-header);
  z-index: 1;
`;

const MenuIcon = styled(Menu)`
  position: relative;
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
  background: var(--color-header);
  z-index: 1;
`;
