import styles from "../styles/Logout.module.css";
import Head from "next/head";
import { useEffect } from "react";
import { useContext } from "react";
import AppContext from "../appContext";
import Link from "next/link";

const logout = () => {
  const context = useContext(AppContext);

  useEffect(() => {
    const loginStatus = {
      loggedin: false,
      uid: null,
      username: null,
    };
    context.setLoginStatus(loginStatus);
    window.localStorage.setItem("login_status", JSON.stringify(loginStatus));
  }, [context]);

  return (
    <>
      <Head>
        <title>Logout</title>
        <meta
          name="description"
          content="Assignment for Firse Booking Internship"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h2 className={styles.title}>Logged Out Successfully</h2>
        <Link href="/login" passHref>
          <a>
            <h4>Login Again?</h4>
          </a>
        </Link>
      </main>
    </>
  );
};

export default logout;
