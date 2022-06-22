import styles from "../styles/CartBookCard.module.css";
import Image from "next/image";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";

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

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={require(`../public/book_images/${book.book_cover}`)}
            width={80}
            height={120}
            alt={book.name}
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <h4 className={styles.textName}>{book.book_name}</h4>
          <h5 className={styles.textAuthor}>{book.book_author}</h5>
        </div>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <Alert show={showAlert} variant={error.status ? "danger" : "success"}>
        {error.message}
      </Alert>
    </>
  );
};

export default CartBookCard;
