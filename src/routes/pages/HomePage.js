import React from "react";
import Header from "../../components/Header";
import AllPosts from "../../components/AllPosts";

export default function Home() {

  document.title = "Home";

  return (
    <>
      <Header/>
      <AllPosts/>
    </>
  );
}
