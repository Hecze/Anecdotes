/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Global from "../../Global";

export default function Post() {
  const { id } = useParams();
  const url = Global.url;
  const [post, setPost] = useState({});

  const getPost = async () => {
    try {
      const res = await fetch(`${url}/posts/${id}`);
      const data = await res.json();
      console.log(data);
      setPost(data.article);
    } catch (error) {
      console.log(error);
      window.location.href = "/posts/my-posts";
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Header />
      <div className="post mt-5">
        <div className="title">{post.title}</div>
        <hr/>
        <div className="content">{post.content}</div>
      </div>
    </>
  );
}
