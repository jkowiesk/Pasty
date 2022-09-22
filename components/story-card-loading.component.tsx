import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0% {
    background: var(--color-gray-1000);
  }
  50% {
    background: var(--color-gray-800);
  }

  100% {
    background: var(--color-gray-1000);
  }
`;
export const StoryCardLoading = styled.div`
  padding-inline: 8px;
  padding-block: 16px;
  border-radius: 5px;
  border: 2px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: var(--shadow-elevation-low);
  min-height: 400px;
  width: 100%;
  height: 450px;
  animation: ${blink} 1s infinite;
`;
