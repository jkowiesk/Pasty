import { useState, useContext } from "react";

import styled, { keyframes, css } from "styled-components";

import ImageExperimental from "next/future/image";
import Image from "next/image";

import AnimatedIcon from "./animated-icon.component";

import { HomeAlt } from "@styled-icons/boxicons-regular/HomeAlt";
import { Person } from "@styled-icons/bootstrap/Person";
import { Menu as MenuSI } from "@styled-icons/boxicons-regular/Menu";
import { LogIn } from "@styled-icons/boxicons-regular/LogIn";

import { isOpenType } from "../utils/types.utils";

import Logo from "../public/images/logo-header.png";

import Menu from "./menu.component";

import { UserContext } from "../contexts/user.context";

type Props = {};

type StyleProps = {
  isOpen: isOpenType;
};

export default function Header() {
  const {
    isLoggedIn,
    user: { username, avatar },
  } = useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = useState<isOpenType>("");

  console.log(username, avatar);

  return (
    <Wrapper>
      <HeaderWrapper>
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
                <LogInIcon />
              )}
            </AnimatedIcon>
            <AnimatedIcon
              onClick={() =>
                setIsMenuOpen((prev) => {
                  switch (prev) {
                    case "true":
                      return "false";
                    case "false":
                      return "true";
                    default:
                      return "true";
                  }
                })
              }
              text="Menu"
            >
              <MenuIcon isOpen={isMenuOpen} />
            </AnimatedIcon>
          </Actions>
        </ActionSide>
      </HeaderWrapper>
      <Menu isOpen={isMenuOpen} />
    </Wrapper>
  );
}

const rotateToOpen = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-90deg);
  }
`;

const rotateToClose = keyframes`
  from {
    transform: rotate(-90deg);
  }

  to {
    transform: rotate(0);
  }
`;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HomeWrapper = styled(AnimatedIcon)`
  margin-left: 50px;
`;

const HeaderWrapper = styled.div`
  background: var(--color-background-secondary);
  grid-area: header;
  display: flex;
  align-items: center;

  height: 100px;
`;

const Avatar = styled(ImageExperimental)`
  position: relative;
  border-radius: 50%;
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

const LogInIcon = styled(LogIn)`
  position: relative;
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
  background: var(--color-background-secondary);
  z-index: 1;
`;

const MenuIcon = styled(MenuSI)`
  position: relative;
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
  background: var(--color-background-secondary);
  z-index: 1;
  transform: ${({ isOpen }: StyleProps) => {
    switch (isOpen) {
      case "true":
        return "rotate(-90deg)";
      case "false":
        return "rotate(0)";
      default:
        return "rotate(0)";
    }
  }};

  animation: ${({ isOpen }: StyleProps) => {
    switch (isOpen) {
      case "true":
        return css`
          ${rotateToOpen} 1s
        `;
      case "false":
        return css`
          ${rotateToClose} 1s
        `;
      default:
        return null;
    }
  }};
`;
