import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../appContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  const context = useContext(AppContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>FirseRead</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {context.loginStatus.loggedin ? (
            <Nav className="ms-auto">
              <Link href="/cart" passHref>
                <Nav.Link>Cart</Nav.Link>
              </Link>
              <Link href="/logout" passHref>
                <Nav.Link>Logout</Nav.Link>
              </Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Link href="/login" passHref>
                <Nav.Link>Login</Nav.Link>
              </Link>
              <Link href="/signup" passHref>
                <Nav.Link>Sign Up</Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
