import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import { useRouter } from "next/router";
import axios from "axios";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const context = useContext(AppContext);
  const router = useRouter();

  const getBooks = () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      axios
        .get("http://localhost:5000/api/carts/allBooks", {}, config)
        .then((res) => {
          setBooks(res.data.books);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!context.loginStatus.loggedin) {
      router.push("/login");
      return;
    }
    getBooks();
  }, [router, context]);

  return (
    context.loginStatus.loggedin && (
      <div className={styles.container}>
        <Head>
          <title>Firse Read</title>
          <meta
            name="description"
            content="Assignment for Firse Booking Internship"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          <h2 className={styles.title}>
            Welcome back {context.loginStatus.username}!
          </h2>
          <h3 className="title">All Books</h3>
          <div className={styles.booksWrapper}>
            {books &&
              books.map((data, key) => {
                return (
                  <div key={key}>
                    <BookCard book={data} getBooks={getBooks} />
                  </div>
                );
              })}
          </div>
        </main>
      </div>
    )
  );
}
