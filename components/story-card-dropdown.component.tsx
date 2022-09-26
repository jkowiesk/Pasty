import styled from "styled-components";
import { Menu } from "@headlessui/react";

import { BookmarkFill } from "@styled-icons/bootstrap/BookmarkFill";
import { Bookmark } from "@styled-icons/bootstrap/Bookmark";

export default function StoryCardDropdown() {
  return (
    <Menu>
      <Wrapper>
        <Menu.Button>More</Menu.Button>
        <Items>
          <Item>
            <Action>
              <FavoriteIcon />
              <ActionText>Favorite</ActionText>
            </Action>
          </Item>
          <Menu.Item>
            {({ active }) => <a href="/account-settings">Documentation</a>}
          </Menu.Item>
          <Menu.Item>
            <span>Invite a friend (coming soon!)</span>
          </Menu.Item>
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
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const Item = styled(Menu.Item)`
  margin-inline: -8px;
  cursor: pointer;

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

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const FavoriteIcon = styled(Bookmark)`
  width: calc(var(--icons-size) - 10px);
  height: calc(var(--icons-size) - 10px);
  color: var(--color-secondary);
`;

const FavoriteFillIcon = styled(BookmarkFill)`
  width: calc(var(--icons-size) - 10px);
  height: calc(var(--icons-size) - 10px);
  color: var(--color-secondary);
`;

const ActionText = styled.p`
  color: var(--color-primary);
  font-size: 1.5rem;
  opacity: 0.7;
`;
