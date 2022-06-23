import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../appContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
import Logo from "../public/books.png";

const Header = () => {
  const context = useContext(AppContext);

  return (
    <Navbar
      className={styles.navbar}
      variant="dark"
      collapseOnSelect
      expand="lg"
    >
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand className={styles.navbarBrand}>
            <div className={styles.imageWrapper}>
              <Image className={styles.image} alt="logo" src={Logo} />
            </div>
            FirseRead
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {context.loginStatus.loggedin ? (
            <Nav className="ms-auto">
              <Link href="/cart" passHref>
                <Nav.Link className={styles.navLink}>View your Carts</Nav.Link>
              </Link>
              <Link href="/logout" passHref>
                <Nav.Link className={styles.navLink}>Logout</Nav.Link>
              </Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Link href="/login" passHref>
                <Nav.Link className={styles.navLink}>Login</Nav.Link>
              </Link>
              <Link href="/signup" passHref>
                <Nav.Link className={styles.navLink}>Sign Up</Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
