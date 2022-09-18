import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import HomePage from './pages/HomePage'
import MyPostsPage from './pages/MyPosts'
import PerfilPage from './pages/PerfilPage'
import Post from './pages/Post'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

export default function AppRouters() {

  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/my-posts" element={<MyPostsPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="*" element={<div>Not Found</div>} />
    </Routes>  
    )
}
