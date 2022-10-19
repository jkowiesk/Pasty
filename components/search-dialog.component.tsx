import styled from "styled-components";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { TagsInput } from "react-tag-input-component";
import { Cross } from "@styled-icons/entypo/Cross";
import { Search } from "@styled-icons/material/Search";
import CustomBtn from "./custom-btn.component";
import { useRouter } from "next/router";

type Props = {
  isOpen: any;
  setIsOpen: any;
  setMenuIsOpen: any;
};

const newStoryInit = (uid: string) => {
  return {
    title: "",
    content: "",
    tags: "",
    uid,
  };
};

export default function SearchDialog({
  isOpen,
  setIsOpen,
  setMenuIsOpen,
}: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const handleClick = async () => {
    const pathName = router.pathname;
    await router.push({
      pathname: "/search",
      query: { tags },
    });
    if (router.pathname === pathName) window.location.reload();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Overlay />
      <Panel>
        <Wrapper>
          <TagsInputStyled
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="tag"
          />
          <SearchBtn text="Search" onClick={handleClick}>
            <SearchIcon />
          </SearchBtn>
          <Cancel
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <CrossIcon />
          </Cancel>
        </Wrapper>
      </Panel>
    </Dialog>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

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
  height: 15vh;
  width: 30vw;
  padding: 16px 32px;
  background: var(--color-gray-1000);
  border-radius: 5px;
  border: 1px solid var(--color-primary-dark);
  border-bottom: 8px solid var(--color-primary-dark);
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

const TagsInputStyled = styled(TagsInput)`
  grid-area: tags;
`;

const SearchBtn = styled(CustomBtn)`
  margin-top: 10px;
  background: linear-gradient(
    180deg,
    #f7bf50,
    #f7b842,
    #f6b034,
    #f6a826,
    #f5a018,
    #f5970a
  );
  border: 1px solid var(--color-background);
  width: 250px;
  margin: auto;
`;

const SearchIcon = styled(Search)`
  position: relative;
  color: var(--color-background-secondary);
  padding-top: 5px;
  width: var(--btn-icons-size);
  height: var(--btn-icons-size);
  z-index: 1;
`;
