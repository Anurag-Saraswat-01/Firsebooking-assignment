import styles from "../styles/BookCard.module.css";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useContext } from "react";
import AppContext from "../appContext";
import Alert from "react-bootstrap/Alert";

const BookCard = ({ book }) => {
  const [carts, setCarts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCart, setNewCart] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState({
    status: null,
    message: "",
  });

  const context = useContext(AppContext);

  const handleNewCartChange = (e) => {
    setNewCart(e.target.value);
  };

  // handler for adding book a to a cart
  const handleAdd = (cid) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      axios
        .post(
          `http://localhost:5000/api/carts/addToCart`,
          { cid: cid, bid: book.id },
          config
        )
        .then((res) => {
          console.log(res);
          setShowAlert(true);
          setError({ status: false, message: res.data.message });
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

  // handler for creating a new cart
  const handleCreateNewCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      axios
        .post(
          `http://localhost:5000/api/carts/createCart`,
          { uid: context.loginStatus.uid, cartName: newCart, bid: book.id },
          config
        )
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

  // gets al carts for a user
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
          `http://localhost:5000/api/carts/userCarts/${context.loginStatus.uid}`,
          {},
          config
        )
        .then((res) => {
          setCarts(res.data.carts);
        })
        .catch((err) => console.log(err));
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

  return (
    <>
      {/* book card displayed on grid */}
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={require(`../public/book_images/${book.cover}`)}
            width={100}
            height={150}
            alt={book.name}
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <h4 className={styles.textName}>{book.name}</h4>
          <h5 className={styles.textAuthor}>{book.author}</h5>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add to Cart
          </Button>
        </div>
      </div>
      {/* modal for adding to cart */}
      <Modal show={showModal} aria-labelledby="add-to-cart-modal" centered>
        <Modal.Header closeButton onClick={() => setShowModal(false)}>
          <Modal.Title id="add-to-cart-modal">
            Add "{book.name}" to a Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Your Carts</h6>
          <div className={styles.cartsWrapper}>
            {carts.length !== 0
              ? carts.map((data, key) => {
                  return (
                    <div className={styles.cartWrapper} key={key}>
                      <p>{data.name}</p>
                      <Button
                        variant="primary"
                        onClick={() => handleAdd(data.id)}
                      >
                        Add
                      </Button>
                    </div>
                  );
                })
              : "You have no carts"}
          </div>
          <hr />
          {/* form for creating a new cart */}
          <h6>Create New Cart</h6>
          <Form onSubmit={handleCreateNewCart}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="New Cart"
                value={newCart}
                onChange={handleNewCartChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>

          <Alert show={showAlert} variant={error.status ? "danger" : "success"}>
            {error.message}
          </Alert>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookCard;
