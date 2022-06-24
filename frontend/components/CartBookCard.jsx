import styles from "../styles/CartBookCard.module.css";
import Image from "next/image";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";

const CartBookCard = ({ cart_id, book, getCarts }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState({
    status: null,
    message: "",
  });

  const handleDelete = () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      axios
        .delete(
          `http://localhost:5000/api/carts/deleteBook/${cart_id}/${book.book_id}`,
          config
        )
        .then((res) => {
          console.log(res);
          setShowAlert(true);
          setError({ status: false, message: res.data.message });
          setTimeout(() => {
            getCarts();
          }, 500);
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

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={require(`../public/book_images/${book.book_cover}`)}
            alt={book.name}
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <h5 className={styles.textName}>{book.book_name}</h5>
          <h6 className={styles.textAuthor}>By {book.book_author}</h6>
        </div>
        <Button
          className={styles.removeBtn}
          variant="danger"
          onClick={handleDelete}
        >
          Remove
          <FaMinus />
        </Button>
      </div>
      <hr />
      <Alert
        className="my-2"
        show={showAlert}
        variant={error.status ? "danger" : "success"}
      >
        {error.message}
      </Alert>
    </>
  );
};

export default CartBookCard;
