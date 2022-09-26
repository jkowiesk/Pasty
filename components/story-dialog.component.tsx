import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.context";
import styled from "styled-components";

import { Dialog } from "@headlessui/react";
import TextInput from "./text-input.component";
import { newStory, User } from "../utils/types.utils";

import { TagsInput } from "react-tag-input-component";

import { Cross } from "@styled-icons/entypo/Cross";

import { addStoryToDB } from "../utils/firebase.utils";

type Props = {
  isOpen: any;
  setIsOpen: any;
};

const newStoryInit = (uid: string) => {
  return {
    title: "",
    content: "",
    tags: "",
    uid,
  };
};

export default function StoryDialog({ isOpen, setIsOpen }: Props) {
  const {
    user: { uid },
  } = useContext(UserContext);

  const [newStory, setNewStory] = useState<newStory>(newStoryInit(uid));
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setNewStory((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsOpen(false);
    await addStoryToDB({ ...newStory, tags: [newStory.tags] }, uid);
  };

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setNewStory(newStoryInit(uid));
        setIsOpen(false);
      }}
    >
      <Overlay />
      <Panel>
        <Form onSubmit={handleSubmit}>
          <MaxWidth>
            <TitleInput
              label="Title"
              name="title"
              value={newStory.title}
              onChange={handleChange}
              required
            />
          </MaxWidth>
          <TextArea
            name="content"
            value={newStory.content}
            onChange={handleChange}
            required
          />
          <MaxWidth>
            <TagsInputStyled
              value={tags}
              onChange={setTags}
              name="fruits"
              placeHolder="enter fruits"
            />
          </MaxWidth>
          <Submit type="submit">Submit</Submit>
        </Form>
        <Cancel
          onClick={() => {
            setNewStory(newStoryInit(uid));
            setIsOpen(false);
          }}
        >
          <CrossIcon />
        </Cancel>
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
  width: 30vw;
  padding: 8px 32px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 1px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

const TextArea = styled.textarea`
  grid-area: content;
  width: 100%;
  resize: none;
  border-radius: 5px;
  background: var(--color-gray-1000);
  border: 1px solid var(--color-gray-50);
  outline: none;

  &:focus {
    border: 1px solid var(--color-primary);
  }
`;

const TitleInput = styled(TextInput)`
  grid-area: title;
  width: 100%;
`;

const TagsInputStyled = styled(TagsInput)`
  grid-area: tags;
`;

const Cancel = styled.button`
  width: 50px;
  height: 50px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-primary-dark);
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  transform: translateY(-100%);

  &:hover {
    color: var(--color-primary-light);
  }
`;

const CrossIcon = styled(Cross)`
  height: 100%;
  width: 100%;
`;

const MaxWidth = styled.div`
  padding-inline: 8px;
  display: grid;
  justify-content: center;
  padding-top: 8px;
  width: 100%;
`;

const Submit = styled.button`
  grid-area: submit;
  background: linear-gradient(
    180deg,
    #f7bf50,
    #f7b842,
    #f6b034,
    #f6a826,
    #f5a018,
    #f5970a
  );
  color: var(--color-font-black);
  padding: 0;
  border: 0;
  height: 30px;
  align-self: center;
  cursor: pointer;

  &:hover {
    background: var(--color-primary);
  }
`;
