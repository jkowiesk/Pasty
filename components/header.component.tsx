import { useContext } from "react";

import styled from "styled-components";

import ImageExperimental from "next/future/image";
import Image from "next/image";

import AnimatedIcon from "./animated-icon.component";

import { HomeAlt } from "@styled-icons/boxicons-regular/HomeAlt";
import { Person } from "@styled-icons/bootstrap/Person";
import { Menu } from "@styled-icons/boxicons-regular/Menu";

import Logo from "../public/images/logo-header.png";

import { UserContext } from "../contexts/user.context";

type Props = {};

export default function Header() {
  const {
    isLoggedIn,
    user: { username, avatar },
  } = useContext(UserContext);

  console.log(username);

  return (
    <Wrapper>
      <HomeSide>
        <HomeWrapper text="Home" href="/">
          <HomeIcon />
        </HomeWrapper>
      </HomeSide>
      <LogoWrapper>
        <Image src={Logo} alt="Logo" />
      </LogoWrapper>
      <ActionSide>
        <Actions>
          <AnimatedIcon
            text={isLoggedIn ? "Profile" : "Sign In"}
            href={isLoggedIn ? `/users/${username}` : "/sign-in"}
          >
            {avatar ? (
              <Avatar src={avatar} alt="avatar" width={40} height={40} />
            ) : (
              <PersonIcon />
            )}
          </AnimatedIcon>
          <AnimatedIcon text="Menu">
            <MenuIcon />
          </AnimatedIcon>
        </Actions>
      </ActionSide>
    </Wrapper>
  );
}

const HomeWrapper = styled(AnimatedIcon)`
  margin-left: 50px;
`;

const Wrapper = styled.div`
  background: var(--color-background-secondary);
  grid-area: header;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
`;

const Avatar = styled(ImageExperimental)`
  position: relative;
  border-radius: 20px;
  z-index: 1;
`;

const HomeSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
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
  background: var(--color-background-secondary);
  z-index: 1;
`;

const PersonIcon = styled(Person)`
  position: relative;
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
  background: var(--color-background-secondary);
  z-index: 1;
`;

const MenuIcon = styled(Menu)`
  position: relative;
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
  background: var(--color-background-secondary);
  z-index: 1;
`;
