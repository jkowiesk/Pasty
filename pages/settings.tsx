import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";

import Layout from "../components/layout.component";
import TextInput from "../components/text-input.component";

import { UserContext } from "../contexts/user.context";
import { useRouter } from "next/router";

import { NewMessage } from "@styled-icons/entypo/NewMessage";
import CustomBtn from "../components/custom-btn.component";

type Props = {};

type Event = React.FormEvent<HTMLInputElement>;

export default function Settings() {
  const { isLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  return (
    <Layout>
      <Overlay>
        <LeftSide></LeftSide>
        <Main>
          <Header>User Settings</Header>
          <Hr />
          <SettingsSection>
            <Setting>
              <SettingHeader>Change username</SettingHeader>
              <InputSection>
                <SettingTextInput
                  label="New username"
                  name="username"
                  value={username}
                  onChange={(e: Event) => setUsername(e.currentTarget.value)}
                />
                <UpdateBtn text="Update">
                  <EditIcon />
                </UpdateBtn>
              </InputSection>
            </Setting>
            <Setting>
              <SettingHeader>Change password</SettingHeader>
              <InputSection>
                <SettingTextInput
                  label="New password"
                  name="password"
                  value={password}
                  onChange={(e: Event) => setPassword(e.currentTarget.value)}
                />
                <UpdateBtn text="Update">
                  <EditIcon />
                </UpdateBtn>
              </InputSection>
            </Setting>
            <Setting>
              <SettingHeader>Change profile picture</SettingHeader>
              <InputSection>
                <FileInput
                  type="file"
                  name="avatar"
                  accept="image/png, image/jpeg"
                />
                <UpdateBtn text="Update">
                  <EditIcon />
                </UpdateBtn>
              </InputSection>
            </Setting>
          </SettingsSection>
        </Main>
        <RightSide></RightSide>
      </Overlay>
    </Layout>
  );
}

const Overlay = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: 1fr minmax(40ch, 3.5fr) 1fr;
  padding-block: 64px;
`;

const LeftSide = styled.div`
  grid-area: left;
`;

const Main = styled.div`
  grid-area: main;
`;

const RightSide = styled.div`
  grid-area: right;
`;

const SettingsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Header = styled.h1`
  color: var(--color-secondary);
  font-size: 2.5rem;
`;

const Setting = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const SettingHeader = styled.h2`
  color: var(--color-primary);
  text-align: center;
  flex: 1;
`;

const SettingTextInput = styled(TextInput)`
  padding: 8px;
  width: 50%;
`;

const InputSection = styled.section`
  flex: 1.5;
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
`;

const EditIcon = styled(NewMessage)`
  color: var(--color-secondary);
  width: var(--btn-icons-size);
  height: var(--btn-icons-size);
`;

const UpdateBtn = styled(CustomBtn)`
  height: 45px;
  width: 30%;
`;

const Hr = styled.hr`
  border: 1px solid var(--color-background-secondary);
  margin-bottom: 32px;
`;

const FileInput = styled.input`
  margin-bottom: 8px;
  color: var(--color-secondary);
  border-radius: 5px;
  font-size: 1rem;
`;
