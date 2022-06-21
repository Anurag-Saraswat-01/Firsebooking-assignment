import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../appContext";

const Header = () => {
  const context = useContext(AppContext);

  return (
    <nav className="nav navbar-expand-lg navbar-dark bg-dark">
      <div className={`container ${styles.navContainer}`}>
        <Link href="/">
          <a className="navbar-brand">FirseRead</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {context.loginStatus.loggedin ? (
              <>
                <li className="nav-item">
                  <Link href="/cart">
                    <a className="nav-link">Cart</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/logout">
                    <a className="nav-link">Logout</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/login">
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/signup">
                    <a className="nav-link">Sign Up</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
