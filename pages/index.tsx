import styled from "styled-components";

import Head from "next/head";
import Image from "next/image";

import Layout from "../components/Layout";
import StoryCard from "../components/StoryCard";

export default function Home() {
  return (
    <Layout>
      <StoryCard title="Fajna historia" author="Marek test">
        Nisi ad ea fugiat tempor ipsum aliqua labore id laborum Lorem Lorem ex
        commodo. Officia aute labore eiusmod minim consectetur elit dolor minim.
        Velit velit veniam veniam elit amet eu eu aliqua consectetur fugiat.
        Consequat ad et deserunt non. In culpa commodo tempor excepteur nostrud
        aliqua cupidatat eu nisi sint veniam reprehenderit ullamco. Tempor
        ullamco aliqua amet consectetur tempor culpa id incididunt ipsum
        pariatur. Aute exercitation proident adipisicing ad tempor aliquip
        deserunt ad occaecat ea quis fugiat minim.
      </StoryCard>
    </Layout>
  );
}
