import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./Header.module.css";

type HeaderProps = {
  /** "home" floats the bar over the hero photo; "site" sits on the page backdrop. */
  variant: "home" | "site";
};

function Header({ variant }: HeaderProps) {
  const { itemCount } = useCart();

  return (
    <header className={`${styles.header} ${styles[variant]}`}>
      <div className={styles.inner}>
        <NavLink to="/" end className={styles.brand}>
          Cafe App
        </NavLink>
        <nav className={styles.nav} aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/items">Items</NavLink>
          <NavLink to="/cart" end>
            Cart
            <span className={styles.count} aria-label={`${itemCount} items`}>
              {itemCount}
            </span>
          </NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
