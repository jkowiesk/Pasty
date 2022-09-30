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
import { updateAvatar } from "../utils/firebase.utils";
import MainOverlay from "../components/main-overlay-component";

type Props = {};

type Event = React.FormEvent<HTMLInputElement>;

export default function Settings() {
  const {
    isLoggedIn,
    user: { uid },
  } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [file, setFile] = useState<File>();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  return (
    <Layout>
      <MainOverlay>
        <Header>User Settings</Header>
        <Hr />
        <SettingsSection>
          <Setting>
            <SettingHeader>Change username</SettingHeader>
            <InputForm>
              <SettingTextInput
                label="New username"
                name="username"
                value={username}
                onChange={(e: Event) => setUsername(e.currentTarget.value)}
              />
              <UpdateBtn text="Update">
                <EditIcon />
              </UpdateBtn>
            </InputForm>
          </Setting>
          {/* <Setting>
              <SettingHeader>Change password</SettingHeader>
              <InputForm>
                <SettingTextInput
                  label="New password"
                  name="password"
                  value={password}
                  onChange={(e: Event) => setPassword(e.currentTarget.value)}
                />
                <UpdateBtn text="Update">
                  <EditIcon />
                </UpdateBtn>
              </InputForm>
            </Setting> */}
          <Setting>
            <SettingHeader>Change profile picture</SettingHeader>
            <InputForm
              onSubmit={(e) => {
                updateAvatar(uid, file!);
              }}
            >
              <FileInput
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  const input = document.getElementById(
                    "avatar"
                  ) as HTMLInputElement;
                  setFile(input.files![0]);
                }}
              />
              <UpdateBtn text="Update" submit>
                <EditIcon />
              </UpdateBtn>
            </InputForm>
          </Setting>
        </SettingsSection>
      </MainOverlay>
    </Layout>
  );
}

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
  font-weight: none;
`;

const InputForm = styled.form`
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
