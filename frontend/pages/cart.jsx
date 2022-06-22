import styles from "../styles/Cart.module.css";
import Head from "next/head";
import Accordion from "react-bootstrap/Accordion";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AppContext from "../appContext";
import axios from "axios";
import CartBookCard from "../components/CartBookCard";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const cart = () => {
  const [carts, setCarts] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState({
    status: null,
    message: "",
  });

  const context = useContext(AppContext);

  const formatCarts = (cart_books) => {
    const cart_obj = {};
    cart_books.map((data) => {
      const book_data = {
        book_id: data.book_id,
        book_name: data.book_name,
        book_author: data.book_author,
        book_cover: data.book_cover,
      };
      if (data.cart_id in cart_obj) {
        cart_obj[data.cart_id].books.push(book_data);
      } else {
        cart_obj[data.cart_id] = {
          cart_name: data.cart_name,
          books: [book_data],
        };
      }
    });
    setCarts(cart_obj);
  };

  const getCarts = () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      axios
        .get(
          `http://localhost:5000/api/carts/userCartBooks/${context.loginStatus.uid}`,
          {},
          config
        )
        .then((res) => {
          formatCarts(res.data.cart_books);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (cid) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      axios
        .delete(`http://localhost:5000/api/carts/deleteCart/${cid}`, config)
        .then((res) => {
          console.log(res);
          setShowAlert(true);
          setError({ status: false, message: res.data.message });
          getCarts();
        })
        .catch((err) => {
          console.log(err);
          setShowAlert(true);
          setError({ status: true, message: err.response.data.message });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!context.loginStatus.loggedin) {
      return;
    }
    getCarts();
  }, [context]);

  useEffect(() => {
    console.log(carts);
  }, [carts]);

  return (
    <>
      <Head>
        <title>Carts</title>
        <meta
          name="description"
          content="Assignment for Firse Booking Internship"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h2 className="title">Your Carts</h2>
        <Accordion>
          {Object.keys(carts).map((data, key) => {
            return (
              <div key={key}>
                <Accordion.Item eventKey={key.toString()}>
                  <Accordion.Header>
                    {carts[data].cart_name}
                    <Button variant="danger" onClick={() => handleDelete(data)}>
                      Delete
                    </Button>
                  </Accordion.Header>
                  <Accordion.Body>
                    {carts[data].books.map((book, key) => {
                      return (
                        <div key={key}>
                          <CartBookCard
                            cart_id={data}
                            book={book}
                            getCarts={getCarts}
                          />
                        </div>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            );
          })}
        </Accordion>
        <Alert show={showAlert} variant={error.status ? "danger" : "success"}>
          {error.message}
        </Alert>
      </main>
    </>
  );
};

export default cart;
