import { useContext, useState } from "react";
import styled from "styled-components";
import AddStoryBtn from "./add-story-btn.component";
import StoryDialog from "./story-dialog.component";

import { phoneAndSmaller, tabletAndSmaller } from "../utils/constants.utils";

type Props = {
  index?: boolean;
  children: JSX.Element | JSX.Element[];
};

export default function MainOverlay({ index, children }: Props) {
  const [isStoryDialogOpen, setStoryDialogOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      <LeftSide></LeftSide>
      <Main>{children}</Main>
      <RightSide>
        {index && <AddStoryBtn setIsOpen={setStoryDialogOpen} />}
      </RightSide>
      <StoryDialog isOpen={isStoryDialogOpen} setIsOpen={setStoryDialogOpen} />
    </Wrapper>
  );
}

const LeftSide = styled.div`
  grid-area: left;
`;

const Main = styled.div`
  grid-area: main;
`;

const RightSide = styled.div`
  grid-area: right;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: minmax(80px, 1fr) 3fr minmax(80px, 1fr);
  grid-template-rows: 1fr;

  @media ${phoneAndSmaller} {
    grid-template-columns: minmax(10px, 1fr) 15fr minmax(10px, 1fr);
  }
`;
