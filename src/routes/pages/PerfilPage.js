import React from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import Perfil from "../../components/Perfil";

export default function PerfilPage() {
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
      {login ? <Perfil/> : <LoginForm />}
    </>
  );
}
