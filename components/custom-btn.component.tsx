import styled from "styled-components";

type Props = {
  text: string;
  className?: any;
  children?: JSX.Element;
};

export default function CustomBtn({ text, className, children }: Props) {
  return (
    <Wrapper className={className}>
      <ImageWrapper>{children}</ImageWrapper>
      <Label>{text}</Label>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid var(--color-background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div``;

const Label = styled.label`
  margin-left: 5px;
  border-left: 1px solid var(--color-background-secondary);
  padding-left: 5px;
`;
