import styled, { keyframes, css } from "styled-components";

import { isOpenType } from "../utils/types.utils";
import { signOut } from "../utils/firebase.utils";

import AnimatedIcon from "./animated-icon.component";

import { SignOut } from "@styled-icons/fluentui-system-filled/SignOut";

type Props = {
  isOpen: isOpenType;
};

type WrapperProps = {
  isOpen: isOpenType;
};

export default function Menu({ isOpen }: Props) {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Wrapper isOpen={isOpen}>
      <LeftSide></LeftSide>
      <Nav></Nav>
      <RightSide>
        <SignOutWrapper text="Sign Out" onClick={handleSignOut}>
          <SignOutIcon />
        </SignOutWrapper>
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

const LeftSide = styled.div`
  flex: 1;
`;

const RightSide = styled.div`
  flex: 1;
  margin-right: 78px;
  display: flex;
  justify-content: flex-end;
`;

const Nav = styled.nav`
  flex: 3;
`;

const SignOutIcon = styled(SignOut)`
  color: var(--color-primary-dark);
  width: 50px;
  height: 50px;
  background: var(--color-background-secondary);
  position: relative;
  z-index: 1;
`;

const SignOutWrapper = styled(AnimatedIcon)``;

const MaxWidth = styled.div`
  padding-inline: 8px;
  display: grid;
`;

const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  background: var(--color-background-secondary);
  border-radius: 0px 0px 30px 30px;
  border-bottom: 1px solid var(--color-gray-50);

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
