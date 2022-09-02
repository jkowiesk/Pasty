import styled from "styled-components";

import { useRouter } from "next/router";

import Layout from "../../components/layout.component";
import { Card } from "../../components/card.component";

export default function Profile() {
  return (
    <Layout>
      <MaxWidth>
        <Overlay>
          <PreviewCard>dsadsa</PreviewCard>
          <Sidebar>
            <AchievementsCard>dssda</AchievementsCard>
          </Sidebar>
        </Overlay>
      </MaxWidth>
    </Layout>
  );
}

const Overlay = styled.div`
  display: grid;
  grid-template-areas:
    "preview preview"
    "sidebar stories";
  grid-template-rows: 300px 1fr;
  place-items: center;
  height: 100%;
`;

const PreviewCard = styled(Card)`
  grid-area: preview;
  height: 75%;
  width: 100%;
  display: grid;
`;

const Sidebar = styled.div`
  width: 100%;
  padding-right: 25%;
`;

const MaxWidth = styled.div`
  width: 100%;
  padding-inline: 128px;
`;

const AchievementsCard = styled(Card)`
  grid-area: achievements;
  width: 100%;
  height: 100px;
`;
