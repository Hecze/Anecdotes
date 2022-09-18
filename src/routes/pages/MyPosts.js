import React from "react";
import Header from "../../components/Header";
import MyPosts from "../../components/MyPosts";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm";

export default function MyPostsPage() {
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
      {login ? <MyPosts username={username} /> : <LoginForm />}
    </>
  );
}
