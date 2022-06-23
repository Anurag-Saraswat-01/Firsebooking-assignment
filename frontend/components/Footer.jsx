import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
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
        <br />
        <a
          href="https://www.flaticon.com/free-icons/books"
          target="_blank"
          rel="noopener noreferrer"
          title="books icons"
        >
          Books icons created by Freepik - Flaticon
        </a>
      </div>
    </footer>
  );
};

export default Footer;
