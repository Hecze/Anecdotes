/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Global from "../../Global";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";

export default function EditPost() {
  const { id } = useParams();
  const url = Global.url;

  const [post, setPost] = useState({});

  const getPost = async () => {
    const res = await fetch(`${url}/posts/${id}`);
    const data = await res.json();
    console.log(data);
    setPost(data.article);
  };

  useEffect(() => {
    getPost();
  }, []);

  const [redirect, setRedirect] = useState(false);

  const [article, setArticle] = React.useState({
    title: post.title,
    content: post.content,
  });

  //referencia de los formulario

  let titleRef = React.createRef();
  let contentRef = React.createRef();

  const changeState = () => {
    setArticle({
      title: titleRef.current.value,
      content: contentRef.current.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeState();
    console.log(article);
    //fetch PUT
    fetch(url + `/posts/${id}/update`, {
      method: "PUT",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />

      <div className="container mt-4 p-5 d-flex justify-content-center ">
        <div
          className="card bg-dark p-5 pb-4 shadow border border-secondary"
          style={{ width: "70vh" }}
        >
          <div className="card-header text-white">
            <h1>Edit Post</h1>
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
                  placeholder={post.title}
                  value={post.title}
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
                  placeholder={post.content}
                  value={post.content}
                  style={{ height: "35vh" }}
                  name="content"
                  ref={contentRef}
                  onChange={changeState}
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-success">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
