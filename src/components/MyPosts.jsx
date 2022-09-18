import Global from "../Global";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EmptyPosts from "./EmptyPosts";

export default function Posts({ username }) {
  const url = Global.url;
  const [posts, setPosts] = useState([]);

  //fetch data from the API

  const getPosts = async () => {
    const res = await fetch(`${url}/posts`);
    const data = await res.json();
    const myPosts = data.articles.filter((post) => post.author === username);
    setPosts(myPosts);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${url}/posts/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
    console.log("Showing ", username + "'s posts");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-0 pt-5  gap-4 d-flex flex-wrap  justify-content-center">
      {posts.length > 0
        ? posts.map((post, index) => (
            <div
              key={index}
              style={{ minWidth: "70vw", maxWidth: "100vw" }}
              className="card bg-dark p-4 m-2 shadow border border-secondary post "
            >
              <NavLink
                className="card-header text-white p-4  text-decoration-none border-0 "
                to={`/posts/${post._id}`}
              >
                <h1>{post.title}</h1>
              </NavLink>
              <div className="d-flex gap-3 justify-content-end ">
                <button
                  onClick={() => {
                    handleDelete(post._id);
                  }}
                  className="btn btn-danger x"
                >
                  X
                </button>
                <NavLink to={`/posts/${post._id}/edit`}>
                  <button className="btn btn-warning">Edit</button>
                </NavLink>
              </div>
            </div>
          ))
        : <EmptyPosts/>}
    </div>
  );
}
