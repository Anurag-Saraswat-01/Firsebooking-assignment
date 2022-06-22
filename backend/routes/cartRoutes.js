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

router.route("/deleteBook/:cid/:bid").delete(deleteBook);

router.route("/deleteCart/:id").delete(deleteCart);

module.exports = router;
