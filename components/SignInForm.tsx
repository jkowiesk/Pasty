import React, { useState } from "react";

import styled from "styled-components";
import { Story } from "../utils/types.utils";

import TextInput from "./TextInput";

type Props = {
  story: Story;
  children: string;
};

type Account = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const [account, setAccount] = useState<Account>({ email: "", password: "" });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    console.log(value);

    setAccount((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  return (
    <Form>
      <TextInput
        label="Email"
        name="email"
        onChange={handleChange}
        value={account.email}
      />
    </Form>
  );
}

const Form = styled.form``;
