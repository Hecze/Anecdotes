import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
import Global from "../Global";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const url = Global.url;
  const [redirect, setRedirect] = useState(false);
  const [account, setAccount] = React.useState({
    username: "",
    password: "",
  });

  //referencia de los formulario

  let usernameRef = React.createRef();
  let passwordRef = React.createRef();

  const changeState = () => {
    setAccount({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    changeState();
    //preguntar si los datos estan completos
    if (account.username === "" || account.password === "") {
      alert("Todos los campos son obligatorios");
      return;
    }
    console.log(account);
    //fetch GET LOGIN
    fetch(url + "/signup", {
      method: "POST",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
      dispatch(login(account.username));
      setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />; 
  }

  return (
    <>
      <section className="vh-90 mt-4 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <form className="mb-md-5 mt-md-4 pb-5" onSubmit={handleSubmit}>
                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your username and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">
                        Username:
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        ref={usernameRef}
                        onChange={changeState}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        ref={passwordRef}
                        onChange={changeState}
                      />
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5 mt-3"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>

                  <div>
                    <p className="mb-0">
                      You have an account?{" "}
                      <NavLink to="/login" className="text-white-50 fw-bold">
                          Login
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
