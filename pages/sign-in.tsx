import styled from "styled-components";

import Head from "next/head";
import Image from "next/image";

import Layout from "../components/layout.component";
import SignInForm from "../components/sign-in-form.component";
import SignUpForm from "../components/sign-up-form.component";

type Props = {};

export default function SignIn() {
  return (
    <Layout>
      <Forms>
        <SignInForm />
        <SignUpForm />
      </Forms>
    </Layout>
  );
}

const Forms = styled.div`
  display: grid;
  grid-template-areas: "sign-in sign-up";
  justify-items: center;
  padding-top: 100px;
`;
