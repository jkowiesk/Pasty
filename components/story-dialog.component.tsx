import { useState, useContext } from "react";
import { UserContext } from "../contexts/user.context";
import styled from "styled-components";

import { Dialog } from "@headlessui/react";
import TextInput from "./text-input.component";
import { newStory } from "../utils/types.utils";

type Props = {
  isOpen: any;
  setIsOpen: any;
};

export default function StoryDialog({ isOpen, setIsOpen }: Props) {
  const { user } = useContext(UserContext);

  const [newStory, setNewStory] = useState<newStory>({
    title: "",
    content: "",
    tags: "",
    author: user,
  });

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setNewStory((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Overlay />
      <Panel>
        <Form>
          <TitleInput
            label="Title"
            name="title"
            value={newStory.title}
            onChange={handleChange}
            required
          />
          <TagsInput
            label="Tags"
            name="tags"
            value={newStory.tags}
            onChange={handleChange}
          />
          <TextArea
            name="content"
            value={newStory.content}
            onChange={handleChange}
          />
        </Form>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
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
  height: 40vh;
  width: 40vw;
  padding: 8px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 1px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
`;

const Form = styled.form`
  display: grid;
  grid-template-areas: "title tags" "content content";
  justify-items: center;
  align-content: center;
  grid-template-rows: 100px 1fr;
  width: 100%;
  height: 100%;
`;

const TextArea = styled.textarea`
  grid-area: content;
  width: 100%;
`;

const TitleInput = styled(TextInput)`
  grid-area: title;
`;

const TagsInput = styled(TextInput)`
  grid-area: tags;
`;
