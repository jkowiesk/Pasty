import { useState } from "react";
import styled from "styled-components";

type Props = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: any;
  submit?: boolean;
  children?: JSX.Element;
};

export default function CustomBtn({
  text,
  onClick,
  submit,
  className,
  children,
}: Props) {
  const [recentAction, setRecentAction] = useState("default");
  let actionStyles = {};

  switch (recentAction) {
    case "depressed":
      actionStyles = {
        transform: "scale(0.95)",
        transition: "all 50ms",
      };
      break;
    case "hover":
      actionStyles = {
        transform: "scale(0.99)",
        transition: "all 50ms",
      };
      break;
    default:
      actionStyles = {
        transform: "translateY(0)",
        transition: "all 500ms",
      };
  }
  const areChildren = Boolean(children);
  return (
    <Wrapper
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={className}
      style={actionStyles}
      onMouseDown={() => setRecentAction("depressed")}
      onMouseUp={() => setRecentAction("default")}
      onMouseEnter={() => setRecentAction("hover")}
      onMouseLeave={() => setRecentAction("default")}
    >
      {areChildren ? (
        <>
          <ImageWrapper>{children}</ImageWrapper>
          <Label>{text}</Label>
        </>
      ) : (
        <LabelOnly>{text}</LabelOnly>
      )}
    </Wrapper>
  );
}

const ImageWrapper = styled.div``;

const Wrapper = styled.button`
  border: 2px solid var(--color-background-secondary);
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-block: 4px;
  width: 100%;
  opacity: 1;

  &:hover {
    opacity: 0.8;
    transition-property: opacity;
  }
`;

const Label = styled.p`
  margin-left: 16px;
  border-left: 1px solid var(--color-background-secondary);
  padding-left: 16px;
`;

const LabelOnly = styled.p``;
