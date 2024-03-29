import styled from "styled-components";
import { useContext, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";

import Layout from "../components/layout.component";
import SignInForm from "../components/sign-in-form.component";
import SignUpForm from "../components/sign-up-form.component";

import { UserContext } from "../contexts/user.context";
import { useRouter } from "next/router";
import { signOut } from "../utils/firebase.utils";
import { tabletAndSmaller } from "../utils/constants.utils";

type Props = {};

export default function SignIn() {
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);

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

  @media ${tabletAndSmaller} {
    padding-top: 64px;
    grid-template:
      "sign-in"
      "sign-up";
    gap: 64px;
    margin-bottom: 32px;
  }
`;
