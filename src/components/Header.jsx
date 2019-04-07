import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const AppHeader = ({ user }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand className="navbar-brand" as={Link} to="/">
        <i
          class="fa fa-book"
          aria-hidden="true"
          style={{ paddingRight: "6px" }}
        />
        Courses
      </Navbar.Brand>
      <Nav className="mr-auto">
        {user && (
          <Nav.Link
            className="nav-item nav-link active"
            as={Link}
            to="/courses/form/new"
          >
            <i
              className="fa fa-plus"
              aria-hidden="true"
              style={{ paddingRight: "6px" }}
            />
            Add New Course
          </Nav.Link>
        )}
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" />
        <Nav>
          {!user && (
            <React.Fragment>
              <Nav.Link className="nav-link active" as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link className="nav-link active" as={Link} to="/register">
                Register
              </Nav.Link>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <Navbar.Text style={{ color: "white", paddingRight: "10px" }}>
                Welcome {user.firstName} {user.lastName}!
              </Navbar.Text>
              <Nav.Link className="nav-link active" as={Link} to="/logout">
                Logout
              </Nav.Link>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;
