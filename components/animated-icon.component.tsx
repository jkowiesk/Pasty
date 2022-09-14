import styled from "styled-components";
import React from "react";

import Link from "next/link";

type Props = {
  text: string;
  href?: string;
  onClick?: any;
  className?: any;
  onHoverColor?: string;
  children: JSX.Element;
};

type StyleProps = {
  onHoverColor?: string;
};

export default function AnimatedIcon({
  text,
  href,
  onClick,
  className,
  onHoverColor,
  children,
}: Props) {
  return href ? (
    <Link href={href} passHref>
      <LinkWrapper className={className} onHoverColor={onHoverColor}>
        <AnimatedText>{text}</AnimatedText>
        {children}
      </LinkWrapper>
    </Link>
  ) : (
    <ButtonWrapper
      onClick={onClick}
      className={className}
      onHoverColor={onHoverColor}
    >
      <AnimatedText>{text}</AnimatedText>
      {children}
    </ButtonWrapper>
  );
}

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
    color: ${({ onHoverColor }: StyleProps) =>
      onHoverColor || "var(--color-primary-light)"};
  }
  p {
    transition: transform ease-out 0.6s;
  }

  &:hover p {
    transform: translateY(105%);
    color: ${({ onHoverColor }: StyleProps) =>
      onHoverColor || "var(--color-primary-light)"};
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
