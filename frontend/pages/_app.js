import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppContext from "../appContext";

function MyApp({ Component, pageProps }) {
  const [loginStatus, setLoginStatus] = useState({
    loggedin: false,
    uid: NaN,
    username: "",
  });

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

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
