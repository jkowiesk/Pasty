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
import { updateAvatar, updateUsername } from "../utils/firebase.utils";
import MainOverlay from "../components/main-overlay-component";
import { EventsContext } from "../contexts/events.context";

type Props = {};

type Event = React.FormEvent<HTMLInputElement>;

export default function Settings({ query }: any) {
  const {
    isLoggedIn,
    user: { uid },
  } = useContext(UserContext);
  const {
    alert: { message, type },
    dispatchEvents,
  } = useContext(EventsContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [file, setFile] = useState<File>();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);

  return (
    <Layout>
      <MainOverlay>
        <Header>User Settings</Header>
        <Hr />
        <SettingsSection>
          <Setting>
            <SettingHeader>Change username</SettingHeader>
            <InputForm
              onSubmit={async (e) => {
                e.preventDefault();
                const returnCode = await updateUsername(uid, username);
                setUsername("");

                dispatchEvents({ type: "alert", payload: returnCode });
                if (returnCode === "pasty/username/success") {
                  router.push("/");
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }
              }}
            >
              <SettingTextInput
                label="New username"
                name="username"
                value={username}
                labelColor="var(--color-primary-light)"
                onChange={(e: Event) => setUsername(e.currentTarget.value)}
              />
              <InputUpdatedBtn text="Update" submit>
                <EditIcon />
              </InputUpdatedBtn>
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
              onSubmit={async (e) => {
                e.preventDefault();
                const returnCode = await updateAvatar(uid, file!);
                setFile(undefined);
                dispatchEvents({ type: "alert", payload: returnCode });
                if (returnCode === "pasty/username/success") {
                  router.push("/");
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }
              }}
            >
              <Label htmlFor="avatar">
                {file?.name ? file.name : "Select avatar"}
              </Label>
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
  margin-top: 32px;
  color: var(--color-secondary);
  font-size: 2.5rem;
`;

const Setting = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-block: 32px;
`;

const SettingHeader = styled.h2`
  color: var(--color-primary);
  text-align: center;
  flex: 1;
`;

const SettingTextInput = styled(TextInput)`
  padding: 8px;
  width: 80%;
  font-weight: none;
`;

const InputForm = styled.form`
  flex: 1.5;
  display: grid;
  grid-template-columns: 1fr 150px;
  place-items: center;
`;

const EditIcon = styled(NewMessage)`
  color: var(--color-secondary);
  width: var(--btn-icons-size);
  height: var(--btn-icons-size);
`;

const UpdateBtn = styled(CustomBtn)`
  height: 45px;
  width: 150px;
  scale: 0.9;
`;

const InputUpdatedBtn = styled(UpdateBtn)`
  margin-top: 16px;
`;

const Hr = styled.hr`
  border: 5px solid var(--color-background-secondary);
  border-radius: 0 0 200% 200%;
  margin-bottom: 32px;
`;

const FileInput = styled.input`
  margin-bottom: 8px;
  padding-inline: 8px;
  color: var(--color-primary-light);

  font-size: 1rem;

  &[type="file"] {
    display: none;
  }
`;

const Label = styled.label`
  background: var(--color-secondary);
  border-radius: 5px;
  padding: 5px;
  width: max(100px, 50%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  cursor: pointer;
`;
