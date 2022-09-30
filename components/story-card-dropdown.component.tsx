import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { Menu } from "@headlessui/react";

import { BookmarkFill } from "@styled-icons/bootstrap/BookmarkFill";
import { Bookmark } from "@styled-icons/bootstrap/Bookmark";
import { ArrowDropDown } from "@styled-icons/material/ArrowDropDown";
import { Trash } from "@styled-icons/bootstrap/Trash";

import { EventsContext } from "../contexts/events.context";
import { UserContext } from "../contexts/user.context";
import { getIsFavorite, updateFavorites } from "../utils/firebase.utils";

type StyleProps = {
  children: any;
  hovercolor: any;
};

type Props = {
  id: string;
  isCardActive?: boolean;
  className?: any;
};

export default function StoryCardDropdown({
  id,
  isCardActive,
  className,
}: Props) {
  const { dispatchEvents } = useContext(EventsContext);
  const {
    isLoggedIn,
    user: { uid: ClientsUid },
  } = useContext(UserContext);

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    if (isLoggedIn) setIsFavorite(await updateFavorites(ClientsUid, id));
    else {
      dispatchEvents({ type: "alert", payload: "pasty/not-logged" });
    }
  };

  const handleDeleteClick = async (storyId: string) => {
    if (isLoggedIn)
      dispatchEvents({
        type: "confirmation",
        payload: { code: "pasty/delete", data: storyId },
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      getIsFavorite(ClientsUid, id).then((data: any) => setIsFavorite(data));
    }
  }, [isLoggedIn, ClientsUid, id]);

  return (
    <Menu>
      <Wrapper className={className}>
        <DropdownWrapper hovercolor="var(--color-secondary-light)">
          <AnimatedText>Actions</AnimatedText>
          <DropdownIcon isCardActive={isCardActive} />
        </DropdownWrapper>
        <Items>
          <Item>
            <ActionBtn onClick={handleFavoriteClick}>
              {isFavorite ? <FavoriteFillIcon /> : <FavoriteIcon />}
              <ActionText>Favorite</ActionText>
            </ActionBtn>
          </Item>
          {isLoggedIn && (
            <Item>
              <ActionBtn onClick={() => handleDeleteClick(id)}>
                <TrashIcon />
                <ActionText>Delete</ActionText>
              </ActionBtn>
            </Item>
          )}
        </Items>
      </Wrapper>
    </Menu>
  );
}

const Items = styled(Menu.Items)`
  position: absolute;
  background: var(--color-background-secondary);
  border-radius: 5px;
  width: 200px;
  right: 0;
  transform: translateX(35%);
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-block: 8px;
`;

const Item = styled(Menu.Item)`
  cursor: pointer;
  padding: 1px;

  &:hover {
    background: var(--color-background);
  }

  &:hover p {
    opacity: 1;
    transition: opacity 0.5s;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background: var(--color-background-secondary);
`;

const FavoriteIcon = styled(Bookmark)`
  width: calc(var(--icons-size) - 15px);
  height: calc(var(--icons-size) - 15px);
  padding: 0px;
  margin-left: 32px;
  color: var(--color-secondary);
`;

const TrashIcon = styled(Trash)`
  width: calc(var(--icons-size) - 15px);
  height: calc(var(--icons-size) - 15px);
  padding: 0px;
  margin-left: 32px;
  color: var(--color-secondary);
`;

const FavoriteFillIcon = styled(BookmarkFill)`
  width: calc(var(--icons-size) - 15px);
  height: calc(var(--icons-size) - 15px);
  padding: 0px;
  margin-left: 32px;
  color: var(--color-secondary);
`;

const ActionText = styled.p`
  color: var(--color-primary);
  font-size: 1.3rem;
  opacity: 0.7;
  margin-left: 32px;
`;

const DropdownWrapper = styled(Menu.Button)`
  isolation: isolate;
  background: transparent;
  padding: 0;
  position: relative;
  border: none;

  &:hover {
    cursor: pointer;
  }
  * * {
    transition: color;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
  }

  &:hover * * {
    color: ${({ hovercolor }: StyleProps) =>
      hovercolor || "var(--color-primary-light)"};
  }
  p {
    transition: transform ease-out 0.6s;
  }

  &:hover p {
    transform: translateY(105%);
    color: ${({ hovercolor }: StyleProps) =>
      hovercolor || "var(--color-primary-light)"};
  }
`;

const AnimatedText = styled.p`
  position: absolute;
  right: 0;
  left: 0;
  top: 20px;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  font-size: 0.8rem;
  color: transparent;
`;

const DropdownIcon = styled(ArrowDropDown)`
  width: 45px;
  height: 45px;
  position: relative;
  z-index: 1;
  color: var(--color-secondary);
  background: ${({ isCardActive }: { isCardActive?: boolean }) =>
    isCardActive ? "transparent" : "var(--color-gray-1000)"};
`;
