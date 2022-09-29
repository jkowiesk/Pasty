import styled, { keyframes } from "styled-components";

type Props = { setIsOpen: any };

export default function AddStoryBtn({ setIsOpen }: Props) {
  return (
    <Wrapper
      onClick={async () => {
        await setIsOpen(true);
        const html = document.getElementsByTagName("html")[0];
        html.style.paddingRight = "var(--scrollbar-size)";
      }}
    >
      +
    </Wrapper>
  );
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
  left: 92vw;
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
