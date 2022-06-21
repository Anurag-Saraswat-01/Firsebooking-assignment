import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import AppContext from "../appContext";

export default function Home() {
  const context = useContext(AppContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Firse Read</title>
        <meta
          name="description"
          content="Assignment for Firse Booking Internship"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{context.loginStatus.uid}</main>
    </div>
  );
}
