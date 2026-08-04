import { Link } from "react-router-dom";
import styles from "./SiteFooter.module.css";

function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>Cafe App</p>
          <p className={styles.text}>
            A small counter menu — order ahead, pick up when ready.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/items">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </div>
    </footer>
  );
}

export default SiteFooter;
