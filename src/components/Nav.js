import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const theNav = ({ userAuth, setUserAuth }) => {
  const logout = () => {
    setUserAuth(false);
    localStorage.clear();
  };

  return (
    <Navbar>
      <Navbar.Brand>
        {" "}
        <h1>Blog CMS</h1>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to="/posts">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/newpost">
          <Nav.Link>New Post</Nav.Link>
        </LinkContainer>
      </Nav>
      {userAuth && (
        <Button variant="outline-success" onClick={logout}>
          Logout
        </Button>
      )}
    </Navbar>
  );
};

export default theNav;
