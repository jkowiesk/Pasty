import styled, { keyframes, css } from "styled-components";

import { isOpenType } from "../utils/types.utils";
import { signOut } from "../utils/firebase.utils";

import AnimatedIcon from "./animated-icon.component";

import { SignOut } from "@styled-icons/fluentui-system-filled/SignOut";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.context";

type Props = {
  isOpen: isOpenType;
};

type WrapperProps = {
  isOpen: isOpenType;
};

export default function Menu({ isOpen }: Props) {
  const [childrenNum, setChildrenNum] = useState(4);
  const handleSignOut = () => {
    signOut();
  };

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) setChildrenNum(4);
    else setChildrenNum(3);
  }, [isLoggedIn]);

  return (
    <Wrapper isOpen={isOpen}>
      <LeftSide>
        <AnimatedIcon text="Settings" href="/settings">
          <SettingsIcon />
        </AnimatedIcon>
      </LeftSide>
      <Nav childrenNum={childrenNum}>
        <Category>FAQ</Category>
        <Category>About</Category>
        <Category>Day Pasta</Category>
        <>{isLoggedIn && <Category>My Favorites</Category>}</>
      </Nav>
      <RightSide>
        <>
          {isLoggedIn && (
            <SignOutWrapper text="Sign Out" onClick={handleSignOut}>
              <SignOutIcon />
            </SignOutWrapper>
          )}
        </>
      </RightSide>
    </Wrapper>
  );
}

const heightAnimationOpen = keyframes`
  0% {
    height: 0px;
  }
  100% {
    height: 80px;
  }
`;

const heightAnimationClose = keyframes`
  0% {
    height: 80px;
  }
  100% {
    height: 0px;
  }
`;

const hoverBackground = keyframes`
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
`;

const Category = styled.a`
  font-size: 1.5rem;
  color: var(--color-primary-light);
  font-weight: bold;
  padding: 10px;
  opacity: 0.7;
  width: 100%;
  text-align: center;
  transition: background, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;

  &:hover {
    cursor: pointer;
    background: var(--color-background);
    opacity: 1;
  }
`;

const Nav = styled.nav`
  flex: 3;
  display: grid;
  justify-content: space-between;
  align-content: center;
  place-items: center;
  grid-template-columns: ${({ childrenNum }: { childrenNum: number }) =>
    `repeat(auto-fill, ${100 / childrenNum}%)`};
`;

const SignOutIcon = styled(SignOut)`
  color: var(--color-primary-dark);
  width: 50px;
  height: 50px;
  background: var(--color-background-secondary);
  position: relative;
  z-index: 1;
`;

const SignOutWrapper = styled(AnimatedIcon)`
  margin-left: auto;
`;

const SettingsWrapper = styled(AnimatedIcon)`
  margin-left: auto;
`;

const SettingsIcon = styled(Settings)`
  position: relative;
  color: var(--color-primary-dark);
  width: calc(var(--icons-size) + 5px);
  height: calc(var(--icons-size) + 5px);
  background: var(--color-background-secondary);
  z-index: 1;
`;

const MaxWidth = styled.div`
  padding-inline: 8px;
  display: grid;
`;

const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: var(--color-background-secondary);
  border-radius: 0px 0px 30px 30px;
  border-bottom: 1px solid var(--color-gray-50);
  padding-inline: 78px;

  height: ${({ isOpen }: WrapperProps) => {
    switch (isOpen) {
      case "true":
        return "80px";
      case "false":
        return "0px";
      default:
        return "0px";
    }
  }};

  animation: ${({ isOpen }: WrapperProps) => {
    switch (isOpen) {
      case "true":
        return css`
          ${heightAnimationOpen} ease-out 0.5s
        `;
      case "false":
        return css`
          ${heightAnimationClose} ease-out 0.5s
        `;
      default:
        return null;
    }
  }};
`;
