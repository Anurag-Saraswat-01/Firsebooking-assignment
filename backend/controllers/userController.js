require("dotenv").config();
const bcrypt = require("bcrypt");
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

const signupUser = async (req, res) => {
  console.log("Signup request");
  const password = bcrypt.hashSync(req.body.password, +process.env.SALT_ROUNDS);
  const name = req.body.name;
  const email = req.body.email;

  con.query(`SELECT * FROM users WHERE email='${email}';`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      if (result.length === 1) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        con.query(
          `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}');`,
          (err) => {
            if (err) {
              return res.status(400).json({ message: "User not created" });
            } else {
              return res
                .status(201)
                .json({ message: "User created successfully" });
            }
          }
        );
      }
    }
  });
};

const loginUser = async (req, res) => {
  console.log("Login Request");
  const email = req.body.email;
  const password = req.body.password;

  let existingUser = [];

  const setExistingUser = (res) => {
    existingUser = res;
  };

  con.query(`SELECT * FROM users WHERE email='${email}';`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      setExistingUser(result);

      if (existingUser.length === 0) {
        return res.status(400).json({ message: "User does not exist" });
      } else if (bcrypt.compareSync(password, existingUser[0].password)) {
        return res.status(201).json({
          message: "Login Successful",
          uid: existingUser[0].id,
          username: existingUser[0].name,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid Username or Password" });
      }
    }
  });
};

module.exports = {
  signupUser,
  loginUser,
};
