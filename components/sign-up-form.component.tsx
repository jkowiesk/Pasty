import React, { useState } from "react";

import styled from "styled-components";
import { StoryDoc } from "../utils/types.utils";
import { signUpWithEmail } from "../utils/firebase.utils";

import TextInput from "./text-input.component";
import CustomBtn from "./custom-btn.component";
import { Card } from "./card.component";

import { Send } from "@styled-icons/fluentui-system-filled/Send";

type Props = {
  story: StoryDoc;
  children: string;
};

type Account = {
  email: string;
  password: string;
  username: string;
};

const INIT_ACCOUNT: Account = {
  email: "",
  password: "",
  username: "",
};

export default function SignUpForm() {
  const [account, setAccount] = useState<Account>(INIT_ACCOUNT);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setAccount((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("xD");
    signUpWithEmail(account.email, account.password, account.username);
    setAccount(INIT_ACCOUNT);
  };

  return (
    <WrapperCard>
      <HeaderText>Sign Up</HeaderText>
      <Form onSubmit={handleSignUp}>
        <TextInput
          label="Username"
          name="username"
          onChange={handleChange}
          value={account.username}
        />
        <TextInput
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          value={account.password}
        />
        <TextInput
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          value={account.email}
        />
        <SubmitBtn submit text="Sign Up">
          <SubmitIcon />
        </SubmitBtn>
      </Form>
    </WrapperCard>
  );
}

const WrapperCard = styled(Card)`
  gird-area: sign-up;
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

const SubmitBtn = styled(CustomBtn)`
  margin-top: 10px;
  background: var(--color-primary-dark);
`;

const SubmitIcon = styled(Send)`
  color: var(--color-distinct);
  width: 30px;
  height: 30px;
`;
