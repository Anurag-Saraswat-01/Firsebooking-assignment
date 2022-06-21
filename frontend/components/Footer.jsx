import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} bg-dark`}>
      Created by{" "}
      <a
        href="https://anurag-saraswat-01.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Anurag Saraswat
      </a>{" "}
      for{" "}
      <a
        href="https://firsebooking.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Firsebooking
      </a>
    </footer>
  );
};

export default Footer;
