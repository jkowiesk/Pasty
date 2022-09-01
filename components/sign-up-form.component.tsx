import React, { useState } from "react";

import styled from "styled-components";
import { StoryDoc } from "../utils/types.utils";

import TextInput from "./text-input.component";

type Props = {
  story: StoryDoc;
  children: string;
};

type Account = {
  email: string;
  password: string;
  username: string;
};

export default function SignUpForm() {
  const [account, setAccount] = useState<Account>({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setAccount((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  return (
    <Wrapper>
      <HeaderText>Sign Up</HeaderText>
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
        <TextInput
          label="Username"
          name="username"
          onChange={handleChange}
          value={account.username}
        />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  gird-area: sign-up;
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
