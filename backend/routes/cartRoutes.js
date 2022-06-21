const express = require("express");
const {
  getAllBooks,
  createCart,
  getUserCarts,
  addToCart,
  getUserCartBooks,
  deleteBook,
  deleteCart,
} = require("../controllers/cartController");

const router = express.Router();

router.route("/allBooks").get(getAllBooks);

router.route("/createCart").post(createCart, addToCart);

router.route("/userCarts/:id").get(getUserCarts);

router.route("/addToCart").post(addToCart);

router.route("/userCartBooks/:id").get(getUserCartBooks);

router.route("/deleteBook").post(deleteBook);

router.route("/deleteCart").post(deleteCart);

module.exports = router;
