import styled, { keyframes } from "styled-components";
import { isMobile } from "../utils/constants.utils";
import { useCallback } from "react";

type Props = { setIsOpen: any };

export default function AddStoryBtn({ setIsOpen }: Props) {
  const onBtnClick = useCallback(async () => {
    const isChrome = navigator.userAgent.indexOf("Chrome") != -1;
    const mql = window.matchMedia(isMobile);
    await setIsOpen(true);
    if (!mql.matches && isChrome) {
      const html = document.getElementsByTagName("html")[0];
      html.style.paddingRight = "var(--scrollbar-size)";
    }
  }, [setIsOpen]);

  return <Wrapper onClick={onBtnClick}>+</Wrapper>;
}

const hoverAnimation = keyframes`
  from {
      background: var(--color-background-secondary);
      outline: 2px solid transparent;
    }
    to {
      background: var(--color-background-light);
      outline: 2px solid var(--color-secondary);
    }
`;

const Wrapper = styled.button`
  position: fixed;
  display: grid;
  place-content: center;
  background: var(--color-background-secondary);
  color: var(--color-primary);
  font-size: 3.5rem;
  bottom: 40px;
  left: calc(80vw + 60px);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-elevation-medium);

  &:hover {
    animation: ${hoverAnimation} ease-out 1s;
  }
`;
