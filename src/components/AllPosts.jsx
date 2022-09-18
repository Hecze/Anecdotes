/* eslint-disable react-hooks/exhaustive-deps */
import Global from "../Global";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Posts() {
  const url = Global.url;
  const [posts, setPosts] = useState([]);
  const username = useSelector((state) => state.user.username);

  //fetch data from the API

  const getPosts = async () => {
    const res = await fetch(`${url}/posts`);
    const data = await res.json();
    setPosts(data.articles);
    //recortar el texto hasta el punto
  };

  const getSubtitle = (text) => {
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ".") {
        const response = text.slice(0, i) + "...";
        return response;
      }
    }
  };

  //aumentar likes

  const handleClickLike = async (id) => {
    //preguntar los likes

    const res = await fetch(`${url}/posts/${id}`);
    const data = await res.json();

    //preguntar si ya fue likeado (pregunta si username esat en la lista del articulo)

    if (data.article.ownerLikes.includes(username)) {
      await fetch(`${url}/posts/${id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: data.article.likes - 1,
        }),
      });

      await fetch(`${url}/posts/${id}/like/owner`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //quitar username de ownerLikes
          ownerLikes: data.article.ownerLikes.filter(
            (user) => user !== username
          ),
        }),
      });
    } else {
      await fetch(`${url}/posts/${id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: data.article.likes + 1,
        }),
      });

      await fetch(`${url}/posts/${id}/like/owner`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerLikes: [...data.article.ownerLikes, username],
        }),
      });
    }

    //actualizar los likes

    getPosts();
  };

  //redireccion a post

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="m-5 p-5 pt-3 gap-4 d-flex flex-wrap  justify-content-center">
      {posts.map((post, index) => (
        <div className="m-3 mb-1 d-flex" key={index}>
          <NavLink to={`/posts/${post._id}`} style={{ textDecoration: "none" }}>
            <div
              key={index}
              style={{ cursor: "pointer", width: "60vh", maxWidth: "100vw" }}
              className="card bg-dark p-5 pb-4 shadow border border-secondary"
            >
              <div
                className="text-secondary mb-3"
                style={{ marginLeft: "70%" }}
              >
                <b className="text-right">Author: {post.author}</b>
              </div>

              <div className="card-header text-white">
                <h1>{post.title}</h1>
              </div>
              <div className="card-body text-white">
                <p>{getSubtitle(post.content)}</p>
              </div>
            </div>
          </NavLink>
          <div
            className={post.ownerLikes.includes(username) ? "container-likes btn-active" : "container-likes"}
            onClick={() => handleClickLike(post._id)}
          >
            <button key={index} type="button" className="btn-like">
              👍
            </button>
            <div className="likes-count">
              <p className="p-2">{post.likes ? post.likes : 0}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
