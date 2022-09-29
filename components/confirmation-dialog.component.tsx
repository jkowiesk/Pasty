import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { Dialog } from "@headlessui/react";

import { TagsInput } from "react-tag-input-component";

import { Cross } from "@styled-icons/entypo/Cross";
import { Important as ImportantSI } from "@styled-icons/fluentui-system-filled/Important";

import { Search } from "@styled-icons/material/Search";
import CustomBtn from "./custom-btn.component";
import { EventsContext } from "../contexts/events.context";
import { UserContext } from "../contexts/user.context";
import { deleteStory } from "../utils/firebase.utils";

const newStoryInit = (uid: string) => {
  return {
    title: "",
    content: "",
    tags: "",
    uid,
  };
};

export default function ConfirmationDialog() {
  const {
    confirmation: { message, type, data: id },
    dispatchEvents,
  } = useContext(EventsContext);
  const {
    isLoggedIn,
    user: { uid: clientsUid },
  } = useContext(UserContext);

  const handleDelete = async () => {
    if (!isLoggedIn) return;
    dispatchEvents({
      type: "confirmation",
      payload: { code: "pasty/close" },
    });
    const returnCode = await deleteStory(id, clientsUid);
    dispatchEvents({ type: "alert", payload: returnCode });
  };

  const ImportantConfirmation = () => (
    <ImportantWrapper>
      <Header>
        <ImportantIcon />
        <Text>{message}</Text>
      </Header>
      <ButtonWrapper>
        <ConfirmBtn text="Yes" onClick={handleDelete} />
        <CancelBtn
          text="No"
          onClick={() => {
            dispatchEvents({
              type: "confirmation",
              payload: { code: "pasty/close" },
            });
          }}
        />
      </ButtonWrapper>
    </ImportantWrapper>
  );
  return (
    <Dialog open={true} onClose={() => {}}>
      <Overlay />
      <Panel>
        <ImportantConfirmation />
      </Panel>
    </Dialog>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.3;
  background: black;
`;

const Panel = styled(Dialog.Panel)`
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  margin: auto;
  height: 20vh;
  max-width: min(100%, 500px);
  width: 80%;
  padding: 16px 32px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 1px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
`;

const ImportantWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  height: 100%;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImportantIcon = styled(ImportantSI)`
  width: 50px;
  height: 50px;
  color: var(--color-distinct);
  margin-right: 32px;
`;

const Text = styled.p`
  color: var(--color-distinct-light);
  padding-top: 5px;
  font-size: 1.1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ConfirmBtn = styled(CustomBtn)`
  background: var(--color-secondary-light);
  width: 150px;
`;

const CancelBtn = styled(CustomBtn)`
  background: var(--color-distinct);
  width: 150px;
`;
