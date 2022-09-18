import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import Avatar from "../images/Avatar.png";
import Global from "../Global";

export default function Perfil() {
  const url = Global.url;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);

  //fetch data from the API

  const getPosts = async () => {
    const res = await fetch(`${url}/posts`);
    const data = await res.json();
    const myPosts = data.articles.filter(
      (post) => post.author === user.username
    );
    setPosts(myPosts);
  };

  const handleClickLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="perfil">
      <div className="section1">
        <div className="img-container">
          <img src={Avatar} alt="Foto de Porunga" />
        </div>
        <div className="info-container">
          <h1 className="username">{user.username}</h1>
          <h2 className="description">
         pronto los perfiles podran ser compartidos via link
          </h2>
          <br />
        </div>

        <button onClick={handleClickLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <div className="section2 pt-5 pb-5">
        <h1 className="anecdotes-lenght">
          {posts.length} {posts.length > 1 ? "Anecdotes" : "Anecdote"}
        </h1>
        <br />
        <hr className="text-white mt-5"/>
        {posts.map((post, index) => (
          <NavLink
            key={index}
            className="post-list  text-decoration-none border-0"
            to={`/posts/${post._id}`}
          >
            <h3 className="mb-5 p-5">{post.title}</h3>
            <hr />
          </NavLink>
        ))}
        <NavLink to="/create" className={"text-decoration-none"}>
          <h3 className="mas">+</h3>
        </NavLink>
        <hr />
      </div>
    </div>
  );
}
