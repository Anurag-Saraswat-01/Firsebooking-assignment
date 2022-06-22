import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppContext from "../appContext";

function MyApp({ Component, pageProps }) {
  const [loginStatus, setLoginStatus] = useState({
    loggedin: false,
    uid: null,
    username: null,
  });

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("loginStatus");
    if (data) {
      setLoginStatus(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("login_status", JSON.stringify(loginStatus));
  }, [loginStatus]);

  return (
    <AppContext.Provider
      value={{ loginStatus: loginStatus, setLoginStatus: setLoginStatus }}
    >
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AppContext.Provider>
  );
}

export default MyApp;
