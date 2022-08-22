import React, { useState } from "react";

import styled from "styled-components";
import { Story } from "../utils/types.utils";
import TextInput from "./TextInput";

import { signInWithGoogle, signOutWithGoogle } from "../utils/firebase.utils";

type Props = {
  story: Story;
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
        <button onClick={signInWithGoogle}>Sign In with Google</button>
        <button onClick={signOutWithGoogle}>Sign Out</button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  gird-area: sign-in;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderText = styled.h1`
  color: var(--color-primary-dark);
  margin-bottom: 30px;
`;
