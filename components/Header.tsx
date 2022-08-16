import styled from "styled-components";

import Image from "next/image";
import Link from "next/link";

import { HomeAlt } from "@styled-icons/boxicons-regular/HomeAlt";
import { Person } from "@styled-icons/bootstrap/Person";
import { Menu } from "@styled-icons/boxicons-regular/Menu";

import Logo from "../public/images/logo-header.png";

type Props = {};

export default function Header() {
  return (
    <Wrapper>
      <HomeSide>
        <Link href="/">
          <HomeWrapper>
            <HomeIcon />
          </HomeWrapper>
        </Link>
      </HomeSide>
      <LogoWrapper>
        <Image src={Logo} alt="Logo" />
      </LogoWrapper>
      <ActionSide>
        <Actions>
          <IconWrapper>
            <PersonIcon />
          </IconWrapper>
          <IconWrapper>
            <MenuIcon />
          </IconWrapper>
        </Actions>
      </ActionSide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: var(--color-header);
  grid-area: header;
  display: flex;
  align-items: center;
`;

const HomeSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const IconWrapper = styled.a`
  padding: 15px;

  &:hover {
    cursor: pointer;
  }

  &:hover * * {
    color: var(--color-primary-light);
  }
`;

const HomeWrapper = styled(IconWrapper)`
  margin-left: 50px;
`;

const HomeIcon = styled(HomeAlt)`
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
`;

const LogoWrapper = styled.div`
  width: 400px;
  padding-bottom: 20px;
`;

const ActionSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-right: 50px;
`;

const PersonIcon = styled(Person)`
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
`;

const MenuIcon = styled(Menu)`
  color: var(--color-primary-dark);
  width: var(--icons-size);
  height: var(--icons-size);
`;
