import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
import Global from "../Global";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";


export default function LoginForm() {
  const dispatch = useDispatch();
  const url = Global.url;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    changeState();
    //fetch POST
    try {
      setLoading(true);
      const response = await fetch(url + "/login", {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(login(account.username));
    } catch (error) {
      console.log("Account not Founded");
      setLoading(false);
      setMessage("Account not Founded");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

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
                <form
                  className="card-body p-5 text-center"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your username and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">Username:</label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        ref={usernameRef}
                        onChange={changeState}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">Password:</label>
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        ref={passwordRef}
                        onChange={changeState}
                      />
                    </div>

                    <div className="mt-5">
                      {loading ? (
                        <div className="spinner-border text-light"></div>
                      ) : null}
                      <h5 className="text-danger mb-4">{message}</h5>
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5 mt-3"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <NavLink to="/signup" className="text-white-50 fw-bold">
                        Sign Up
                      </NavLink>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
