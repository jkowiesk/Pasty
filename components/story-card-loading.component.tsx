import styled from "styled-components";

export const StoryCardLoading = styled.div`
  padding-inline: 8px;
  padding-block: 16px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 2px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: var(--shadow-elevation-low);
  min-height: 400px;
  width: 100%;
`;
