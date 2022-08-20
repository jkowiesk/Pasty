import styled from "styled-components";

import Head from "next/head";
import Image from "next/image";

import Layout from "../components/Layout";
import SignInForm from "../components/SignInForm";

type Props = {};

export default function SignIn() {
  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
}
