import { useState, useContext, useEffect } from "react";

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

import VerticalMenu from "./vertical-menu.component";

import { UserContext } from "../contexts/user.context";

import {
  BREAKPOINTS,
  isMobile,
  phoneAndSmaller,
  tabletAndSmaller,
} from "../utils/constants.utils";
import HorizontalMenu from "./horizontal-menu.component";
import useWindowSize from "../hooks/use-window-size.hook";

type Props = {};

type StyleProps = {
  isOpen: isOpenType;
};

export default function Header() {
  const {
    isLoggedIn,
    user: { username, avatar },
  } = useContext(UserContext);
  const [renderVerticalMenu, setRenderVerticalMenu] = useState<boolean>(true);

  const [isMenuOpen, setIsMenuOpen] = useState<isOpenType>("");
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width! <= BREAKPOINTS.phone) setRenderVerticalMenu(false);
    else setRenderVerticalMenu(true);
  }, [windowSize]);

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
      {renderVerticalMenu ? (
        <VerticalMenu isOpen={isMenuOpen} />
      ) : (
        <HorizontalMenu
          isOpen={isMenuOpen === "true" ? true : false}
          setIsOpen={setIsMenuOpen}
        />
      )}
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

  @media ${phoneAndSmaller} {
    margin-left: 10px;
  }
`;

const HeaderWrapper = styled.div`
  background: var(--color-background-secondary);
  display: flex;
  align-items: center;

  height: 100px;
`;

const Avatar = styled(ImageExperimental)`
  position: relative;
  border-radius: 50%;
  width: calc(var(--icons-size) + 0px);
  height: calc(var(--icons-size) + 0px);
`;

const HomeSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const LogoWrapper = styled.div`
  width: 300px;
  padding-bottom: 10px;

  @media ${tabletAndSmaller} {
    width: 250px;
  }

  @media ${phoneAndSmaller} {
    padding: 0;
    width: 150px;
  }
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

  @media ${phoneAndSmaller} {
    margin-right: 10px;
  }
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
