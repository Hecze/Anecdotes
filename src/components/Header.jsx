import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{ padding: "15px 27px" }}
      >
        <Container>
          <Navbar.Brand href="#">
            {" "}
            <NavLink className="nav-link " to="/">
              {" "}
              <h2>Anecdotes</h2>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">
                <NavLink className="nav-link" to="/create">
                  Create Post
                </NavLink>
              </Nav.Link>
              <Nav.Link href="#">
                {" "}
                <NavLink className="nav-link " to="/my-posts">
                  My Posts
                </NavLink>
              </Nav.Link>
              <Nav.Link href="#">
                <NavLink className="nav-link" to="/perfil">
                  Perfil
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
