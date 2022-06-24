import styles from "../styles/Login.module.css";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useContext } from "react";
import AppContext from "../appContext";
import { useRouter } from "next/router";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState({
    status: null,
    message: "",
  });

  const context = useContext(AppContext);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Submitting");
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
          "http://localhost:5000/api/users/login",
          {
            email: email,
            password: password,
          },
          config
        )
        .then((res) => {
          console.log(res.data);
          setShowAlert(true);
          setError({ status: false, message: res.data.message });
          const loginStatus = {
            loggedin: true,
            uid: res.data.uid,
            username: res.data.username,
          };
          context.setLoginStatus(loginStatus);
          window.localStorage.setItem(
            "login_status",
            JSON.stringify(loginStatus)
          );

          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          setShowAlert(true);
          setError({ status: true, message: err.response.data.message });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (context.loginStatus.loggedin) router.push("/");
  }, [context, router]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Assignment for Firse Booking Internship"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h2 className="title">Login</h2>
        <div className={styles.formWrapper}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Button
              className={styles.submitBtn}
              variant="outline-warning"
              type="submit"
            >
              Submit
            </Button>
          </Form>

          <Alert
            className="mt-3"
            show={showAlert}
            variant={error.status ? "danger" : "success"}
          >
            {error.message}
          </Alert>
        </div>
      </main>
    </>
  );
};

export default login;
