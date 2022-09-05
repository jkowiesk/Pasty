import React, { useState } from "react";

import styled from "styled-components";
import { StoryDoc } from "../utils/types.utils";
import TextInput from "./text-input.component";

import { signInWithGoogle } from "../utils/firebase.utils";
import { Google } from "@styled-icons/boxicons-logos/Google";

import CustomBtn from "./custom-btn.component";

type Props = {
  story: StoryDoc;
  children: string;
};

type Account = {
  email: string;
  password: string;
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

  return (
    <Wrapper>
      <HeaderText>Sign In</HeaderText>
      <Form>
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
        <GoogleBtn text="Sign In with Google" onClick={signInWithGoogle}>
          <GoogleIcon />
        </GoogleBtn>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  gird-area: sign-in;
  width: 250px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderText = styled.h1`
  color: var(--color-secondary);
  margin-bottom: 30px;
`;

const GoogleBtn = styled(CustomBtn)`
  background: var(--color-gray-1000);
`;

const GoogleIcon = styled(Google)`
  color: var(--color-secondary);
  width: 30px;
  height: 30px;
`;
