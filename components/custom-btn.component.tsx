import styled from "styled-components";

type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: any;
  children?: JSX.Element;
};

export default function CustomBtn({
  text,
  onClick,
  className,
  children,
}: Props) {
  return (
    <Wrapper onClick={onClick} className={className}>
      <ImageWrapper>{children}</ImageWrapper>
      <Label>{text}</Label>
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
`;

const Label = styled.p`
  margin-left: 16px;
  border-left: 1px solid var(--color-background-secondary);
  padding-left: 16px;
`;
