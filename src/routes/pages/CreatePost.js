import React from "react";
import CreatePostForm from "../../components/CreatePostForm";
import { useState, useEffect } from "react";

import Header from "../../components/Header";

import { useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm";

export default function CreatePost() {
  const [login, setLogin] = useState(false);
  let username = useSelector((state) => state.user.username);

  useEffect(() => {
    if (username) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [username]);
  return (
    <>
      <Header />
      {login ? <CreatePostForm username={username} /> : <LoginForm />}
    </>
  );
}
