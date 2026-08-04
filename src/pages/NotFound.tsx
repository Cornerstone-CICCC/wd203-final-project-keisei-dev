import { Link } from "react-router-dom";
import page from "../styles/page.module.css";
import shared from "../styles/shared.module.css";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <section className={styles.notFound}>
      <p className={styles.code}>404</p>
      <h1 className={page.title}>Page not found</h1>
      <p>That route does not exist in Cafe App.</p>
      <Link to="/" className={shared.button}>
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
