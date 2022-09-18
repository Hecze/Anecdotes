import React from 'react'
import { NavLink } from 'react-router-dom'

export default function EmptyPosts() {
  return (
    <>
      <div className="empty-posts mt-5 pt-5">
        <NavLink to="/create" className="text-decoration-none">
        <h1 className="text-center mt-5 pt-5 empty-message">Add your first anecdote <br /> + </h1>
        </NavLink>
    </div>        
    </>
  )
}
