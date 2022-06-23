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
import { FaShoppingCart, FaPlus } from "react-icons/fa";

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
            alt={book.name}
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <h5 className={styles.textName}>{book.name}</h5>
          <h6 className={styles.textAuthor}>By {book.author}</h6>
          <Button
            className={styles.addBtn}
            variant="outline-warning"
            onClick={() => setShowModal(true)}
          >
            Add to Cart
            <FaShoppingCart />
          </Button>
        </div>
      </div>
      {/* modal for adding to cart */}
      <Modal show={showModal} aria-labelledby="add-to-cart-modal" centered>
        <Modal.Header
          className={styles.modalHeader}
          closeButton
          onClick={() => setShowModal(false)}
        >
          <Modal.Title id="add-to-cart-modal">
            Add "{book.name}" to a Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <h5>Your Carts</h5>
          <div className={styles.cartsWrapper}>
            {carts.length !== 0
              ? carts.map((data, key) => {
                  return (
                    <div className={styles.cartWrapper} key={key}>
                      <p className={styles.cartName}>{data.name}</p>
                      <Button
                        className={styles.addBtn}
                        variant="outline-warning"
                        onClick={() => handleAdd(data.id)}
                      >
                        Add
                        <FaPlus />
                      </Button>
                    </div>
                  );
                })
              : "You have no carts"}
          </div>
          <hr />
          {/* form for creating a new cart */}
          <h5>Create New Cart</h5>
          <Form className={styles.newCartForm} onSubmit={handleCreateNewCart}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="New Cart"
                value={newCart}
                onChange={handleNewCartChange}
                required
              />
            </Form.Group>
            <Button
              className={styles.addBtn}
              variant="outline-warning"
              type="submit"
            >
              Create
              <FaPlus />
            </Button>
          </Form>

          <Alert
            className="mt-3"
            show={showAlert}
            variant={error.status ? "danger" : "success"}
          >
            {error.message}
          </Alert>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookCard;
