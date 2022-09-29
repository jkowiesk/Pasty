import styled, { keyframes } from "styled-components";
import React from "react";

import Link from "next/link";

type Props = {
  text: string;
  href?: string;
  onClick?: any;
  className?: any;
  hovercolor?: string;
  children: JSX.Element;
};

type StyleProps = {
  hovercolor?: string;
};

export default function AnimatedIcon({
  text,
  href,
  onClick,
  className,
  hovercolor,
  children,
}: Props) {
  return href ? (
    <Link href={href} passHref>
      <LinkWrapper className={className} hovercolor={hovercolor}>
        <AnimatedText>{text}</AnimatedText>
        {children}
      </LinkWrapper>
    </Link>
  ) : (
    <ButtonWrapper
      onClick={onClick}
      className={className}
      hovercolor={hovercolor}
    >
      <AnimatedText>{text}</AnimatedText>
      {children}
    </ButtonWrapper>
  );
}

const slideIn = (hovercolor: string) => keyframes`
  from {
    color: transparent;
    transform: translate(0%);
  }
  to {
    color: ${hovercolor};
    transform: translateY(105%);
  }
`;

const LinkWrapper = styled.a`
  isolation: isolate;
  position: relative;
  padding: 8px;
  background: transparent;

  &:hover {
    cursor: pointer;
  }
  * * {
    transition: color;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
  }

  &:hover * * {
    color: ${({ hovercolor }: StyleProps) =>
      hovercolor || "var(--color-primary-light)"};
  }

  &:hover p {
    animation-duration: 1s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    animation-name: ${({ hovercolor }: StyleProps) =>
      slideIn(hovercolor || "var(--color-primary-light)")};
  }
`;

const ButtonWrapper = styled(LinkWrapper).attrs({
  as: "button",
})`
  border: none;
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
  font-size: 0.8rem;
  color: transparent;
`;
