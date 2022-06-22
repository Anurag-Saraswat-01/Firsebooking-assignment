require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: "*",
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

// To get data from input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
