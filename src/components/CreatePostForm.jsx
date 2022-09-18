import React from "react";
import Global from "../Global";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreatePostForm({username}) {
  const url = Global.url;

  const [redirect, setRedirect] = useState(false);

  const [article, setArticle] = useState({
    title: "",
    content: "",
  });

  //referencia de los formulario

  let titleRef = React.createRef();
  let contentRef = React.createRef();

  const changeState = () => {
    setArticle({
      title: titleRef.current.value,
      content: contentRef.current.value,
      author: username,

    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeState();
    //preguntar si esta completo
    if (article.title === "" || article.content === "") {
      alert("Todos los campos son obligatorios");
      return;
    }
    //fetch POST
    fetch(url + "/posts/new", {
      method: "POST",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,username);
      });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>

      <div className="container mt-5 mb-5 d-flex justify-content-center ">
        <div
          className="card bg-dark p-5 pb-4 shadow border border-secondary"
          style={{ minWidth: "390px" , width: "35vw", maxWidth: "100vw" }}
        >
          <div className="card-header text-white">
            <h1>Create Post</h1>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="title" className="text-white mb-2">
                  <b>Title:</b>
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  id="title"
                  placeholder="Enter title"
                  name="title"
                  ref={titleRef}
                  onChange={changeState}
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="description" className="text-white mb-2">
                  <b>Content:</b>
                </label>
                <textarea
                  className="form-control z-depth-1 shadow-sm"
                  id="Content"
                  rows="3"
                  placeholder="Enter Content"
                  style={{ height: "35vh" }}
                  name="content"
                  ref={contentRef}
                  onChange={changeState}
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-success">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
