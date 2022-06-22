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
  }, []);

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
        <h2 className="title">Logged Out Successfully</h2>
        <Link href="/login" passHref>
          <a>Login Again?</a>
        </Link>
      </main>
    </>
  );
};

export default logout;
