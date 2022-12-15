import styled, { keyframes } from "styled-components";

import { isOpenType } from "../utils/types.utils";
import { signOut } from "../utils/firebase.utils";

import AnimatedIcon from "./animated-icon.component";

import { Search } from "@styled-icons/material/Search";
import { SignOut } from "@styled-icons/fluentui-system-filled/SignOut";
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";

import { Dispatch, Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.context";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";

import styles from "../styles/horizontal-menu.module.css";
import SearchDialog from "./search-dialog.component";
import CustomBtn from "./custom-btn.component";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<isOpenType>;
};

export default function HorizontalMenu({ isOpen, setIsOpen }: Props) {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);
  const [childrenNum, setChildrenNum] = useState(4);
  const handleSignOut = () => {
    signOut();
  };

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) setChildrenNum(4);
    else setChildrenNum(2);
  }, [isLoggedIn]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => {
            setIsOpen("false");
          }}
        >
          {!isSearchDialogOpen && <Overlay />}
          <Transition.Child
            as={Fragment}
            enter={styles.enterMenu}
            enterFrom={styles.enterFromMenu}
            enterTo={styles.enterToMenu}
            leave={styles.leaveMenu}
            leaveFrom={styles.leaveFromMenu}
            leaveTo={styles.leaveToMenu}
          >
            <Panel>
              <CloseBtn text="Close" onClick={() => setIsOpen("false")}>
                <CloseIcon />
              </CloseBtn>
              <TopSide>
                <AnimatedIcon
                  text="Search"
                  onClick={() => {
                    setSearchDialogOpen(true);
                  }}
                >
                  <SearchIcon />
                </AnimatedIcon>
              </TopSide>
              <Nav childrenNum={childrenNum}>
                {isLoggedIn && (
                  <Link href="/settings" passHref>
                    <Category>Settings</Category>
                  </Link>
                )}
                <Link href="/about" passHref>
                  <Category>About</Category>
                </Link>
                <Link href="/day-pasta" passHref>
                  <Category>Day Pasta</Category>
                </Link>

                {isLoggedIn && (
                  <Link href="/favorites" passHref>
                    <Category>Favorites</Category>
                  </Link>
                )}
              </Nav>
              <BottomSide>
                {isLoggedIn && (
                  <SignOutWrapper text="Sign Out" onClick={handleSignOut}>
                    <SignOutIcon />
                  </SignOutWrapper>
                )}
              </BottomSide>
            </Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      <SearchDialog
        isOpen={isSearchDialogOpen}
        setIsOpen={setSearchDialogOpen}
        setMenuIsOpen={setSearchDialogOpen}
      />
    </>
  );
}

const Panel = styled(Dialog.Panel)`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  padding-block: 33px;
  height: 100%;
  overflow: hidden;
  border-radius: 30px 0px 0px 30px;
  background: var(--color-background-secondary);
`;

const TopSide = styled.div`
  flex: 1;
  display: flex;
  padding-bottom: 10px;
`;

const BottomSide = styled.div`
  flex: 1;
  display: flex;
  padding-bottom: 10px;
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

const Category = styled.a`
  font-size: 1.5rem;
  color: var(--color-primary-light);
  font-weight: bold;
  padding: 10px;
  opacity: 0.7;
  width: 100%;
  text-align: center;
  transition: background, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background: var(--color-background);
    opacity: 1;
  }
`;

const Nav = styled.nav`
  flex: 3;
  display: grid;
  justify-content: space-between;
  align-content: center;
  place-items: center;
  grid-template-rows: ${({ childrenNum }: { childrenNum: number }) =>
    `repeat(auto-fill, ${100 / childrenNum}%)`};
`;

const SignOutIcon = styled(SignOut)`
  color: var(--color-primary-dark);
  width: 50px;
  height: 50px;
  background: var(--color-background-secondary);
  position: relative;
  z-index: 1;
`;

const SignOutWrapper = styled(AnimatedIcon)`
  margin-left: auto;
`;

const SearchIcon = styled(Search)`
  color: var(--color-primary-dark);
  padding-top: 5px;
  width: 45px;
  height: 50px;
  background: var(--color-background-secondary);
  position: relative;
  z-index: 1;
`;

const CloseBtn = styled(AnimatedIcon)`
  color: var(--color-primary);
`;

const CloseIcon = styled(SquaredCross)`
  width: 45px;
  height: 45px;
  padding: 5px;
`;
