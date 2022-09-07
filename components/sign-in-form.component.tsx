import React, { useState } from "react";

import styled from "styled-components";
import { StoryDoc } from "../utils/types.utils";
import TextInput from "./text-input.component";

import { signInWithGoogle, signInWithEmail } from "../utils/firebase.utils";

import { Google } from "@styled-icons/boxicons-logos/Google";
import { Send } from "@styled-icons/fluentui-system-filled/Send";
import { Card } from "./card.component";

import CustomBtn from "./custom-btn.component";

type Props = {
  story: StoryDoc;
  children: string;
};

type Account = {
  email: string;
  password: string;
};

const INIT_ACCOUNT: Account = {
  email: "",
  password: "",
};

export default function SignUpForm() {
  const [account, setAccount] = useState<Account>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setAccount((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const returnCode = signInWithEmail(account.email, account.password);
    setAccount(INIT_ACCOUNT);
  };

  return (
    <WrapperCard>
      <HeaderText>Sign In</HeaderText>
      <Form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          value={account.email}
        />
        <TextInput
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          value={account.password}
        />
        <SubmitBtn submit text="Sign In">
          <SubmitIcon />
        </SubmitBtn>
      </Form>
      <ButtonsSection>
        <GoogleBtn text="Sign In with Google" onClick={signInWithGoogle}>
          <GoogleIcon />
        </GoogleBtn>
      </ButtonsSection>
    </WrapperCard>
  );
}

const WrapperCard = styled(Card)`
  gird-area: sign-in;
  padding: 16px 64px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HeaderText = styled.h1`
  color: var(--color-secondary);
`;

const ButtonsSection = styled.div``;

const SubmitBtn = styled(CustomBtn)`
  margin-top: 10px;
  background: var(--color-primary-dark);
`;

const SubmitIcon = styled(Send)`
  color: var(--color-distinct);
  width: 30px;
  height: 30px;
`;

const GoogleBtn = styled(CustomBtn)`
  background: var(--color-gray-1000);
`;

const GoogleIcon = styled(Google)`
  color: var(--color-secondary);
  width: 30px;
  height: 30px;
`;
