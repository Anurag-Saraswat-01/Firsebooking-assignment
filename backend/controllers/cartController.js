const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "firseread",
});

// Connecting to database
const main = () => {
  con.connect((err) => {
    if (err) throw err;
    else console.log("Database connected succesfully");
  });
};

main();

const getAllBooks = async (req, res) => {
  console.log("All book request");

  con.query(`SELECT * FROM books;`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong" });
    } else if (result.length === 0) {
      return res.status(404).json({ message: "No books found" });
    } else {
      return res
        .status(200)
        .json({ message: "All books returned", books: result });
    }
  });
};

const createCart = async (req, res, next) => {
  console.log("New cart request");
  const uid = req.body.uid;
  const cartName = req.body.cartName;
  const bid = req.body.bid;

  con.query(
    `SELECT * FROM carts WHERE user_id=${uid} AND name='${cartName}';`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      } else if (result.length === 0) {
        con.query(
          `INSERT INTO carts (name, user_id) VALUES ('${cartName}', ${uid});`,
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ message: "Cart not created" });
            } else {
              next();
            }
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Cart with same name already exists" });
      }
    }
  );
};

const getUserCarts = (req, res) => {
  console.log("User cart request");
  const uid = req.params.id;

  con.query(`SELECT * FROM carts WHERE user_id=${uid};`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      return res.status(200).json({
        message: "Returned user carts",
        carts: result,
      });
    }
  });
};

const addToCart = (req, res) => {
  console.log("Adding book to cart");
  let cid = req.body.cid || null;
  const bid = req.body.bid;

  const innerAdd = () => {
    con.query(
      `SELECT * FROM cart_books WHERE cart_id=${cid} AND book_id=${bid};`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Something went wrong" });
        } else {
          if (result.length === 1) {
            return res.status(400).json({ message: "Book already in cart" });
          } else {
            con.query(
              `INSERT INTO cart_books (cart_id, book_id) VALUES (${cid}, ${bid});`,
              (err) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ message: "Book not added to cart" });
                } else {
                  return res
                    .status(200)
                    .json({ message: "Book added to cart" });
                }
              }
            );
          }
        }
      }
    );
  };

  if (!cid) {
    const uid = req.body.uid;
    const cartName = req.body.cartName;
    con.query(
      `SELECT id FROM carts WHERE user_id=${uid} AND name='${cartName}';`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Something went wrong" });
        } else {
          cid = result[0].id;
          innerAdd();
        }
      }
    );
  } else {
    innerAdd();
  }
};

const getUserCartBooks = (req, res) => {
  const uid = req.params.id;

  con.query(
    `SELECT 
    carts.id AS cart_id,
    carts.name AS cart_name,
    books.id AS book_id,
    books.name AS book_name,
    books.author AS book_author,
    books.cover AS book_cover
FROM
    users
        INNER JOIN
    carts ON users.id = carts.user_id
        INNER JOIN
    cart_books ON carts.id = cart_books.cart_id
        INNER JOIN
    books ON cart_books.book_id = books.id
WHERE
    user_id = ${uid}
ORDER BY carts.name;
  `,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json({ message: "Cart books not found" });
      } else {
        console.log(result);
        res
          .status(200)
          .json({ message: "Cart books returned", cart_books: result });
      }
    }
  );
};

const deleteBook = (req, res) => {
  const cid = req.body.cid;
  const bid = req.body.bid;

  con.query(
    `DELETE FROM cart_books WHERE cart_id=${cid} AND book_id=${bid}`,
    (err) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Book was not removed from cart" });
      } else {
        res.status(201).json({ message: "Book removed successfully" });
      }
    }
  );
};

const deleteCart = (req, res) => {
  const cid = req.body.cid;

  con.query(`DELETE FROM carts WHERE id=${cid}`, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Cart was not deleted" });
    } else {
      res.status(201).json({ message: "Cart was deleted successfully" });
    }
  });
};

module.exports = {
  getAllBooks,
  createCart,
  getUserCarts,
  addToCart,
  getUserCartBooks,
  deleteBook,
  deleteCart,
};
