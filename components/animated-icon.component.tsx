import styled from "styled-components";
import React from "react";

import Link from "next/link";

type Props = {
  text: string;
  href?: string;
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
  className,
  onHoverColor,
  children,
}: Props) {
  return href ? (
    <Link href={href}>
      <LinkWrapper className={className} onHoverColor={onHoverColor}>
        <AnimatedText>{text}</AnimatedText>
        {children}
      </LinkWrapper>
    </Link>
  ) : (
    <ButtonWrapper className={className} onHoverColor={onHoverColor}>
      <AnimatedText>{text}</AnimatedText>
      {children}
    </ButtonWrapper>
  );
}

const LinkWrapper = styled.a`
  isolation: isolate;
  position: relative;
  padding: 5px;
  background: transparent;

  &:hover {
    cursor: pointer;
  }

  &:hover * * {
    color: ${({ onHoverColor }: StyleProps) =>
      onHoverColor || "var(--color-primary-light)"};
  }

  &:hover p {
    transform: translateY(80%);
    color: ${({ onHoverColor }: StyleProps) =>
      onHoverColor || "var(--color-primary-light)"};
    transition: transform 0.6s;
    transition-timing-function: ease-out;
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
  font-size: 0.85rem;
  color: transparent;
`;
