import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./CartSidebar.module.css";

function CartSidebar() {
  const { pathname } = useLocation();
  const { cartItems, total, itemCount, removeFromCart } = useCart();
  const isHome = pathname === "/";
  const dockRef = useRef<HTMLElement>(null);

  // The dock floats over the hero photo, so the hero needs to know how much
  // room to leave for it as the cart grows.
  useEffect(() => {
    const dock = dockRef.current;
    const shell = dock?.parentElement;

    if (!dock || !shell || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      shell.style.setProperty("--home-cart-height", `${dock.offsetHeight}px`);
    });

    observer.observe(dock);

    return () => {
      observer.disconnect();
      shell.style.removeProperty("--home-cart-height");
    };
  }, [isHome]);

  if (isHome) {
    return (
      <aside className={styles.dock} aria-label="Shopping cart" ref={dockRef}>
        <div className={styles.dockHeader}>
          <h2 className={styles.dockTitle}>Cart</h2>
          <span className={styles.dockBadge} aria-live="polite">
            {itemCount}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <p className={styles.dockEmpty}>
            Your cart is empty. Browse the menu to add something.
          </p>
        ) : (
          <ul className={styles.dockList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.dockItem}>
                <div>
                  <p className={styles.dockName}>{item.name}</p>
                  <p className={styles.dockMeta}>
                    ×{item.quantity} · $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.dockRemove}
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.dockFooter}>
          <p className={styles.dockTotal}>
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </p>
          <Link to="/cart" className={styles.dockButton}>
            {itemCount > 0 ? "View cart" : "Open cart"}
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar} aria-label="Shopping cart">
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Your cart</h2>
        <span className={styles.sidebarBadge} aria-live="polite">
          {itemCount}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <p className={styles.sidebarEmpty}>
          Your cart is empty. Browse the menu to add something.
        </p>
      ) : (
        <ul className={styles.sidebarList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.sidebarItem}>
              <div>
                <p className={styles.sidebarName}>{item.name}</p>
                <p className={styles.sidebarMeta}>
                  ×{item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                className={styles.sidebarRemove}
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.sidebarFooter}>
        <p className={styles.sidebarTotal}>
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </p>
        <Link to="/cart" className={styles.sidebarLink}>
          View cart
        </Link>
        {itemCount > 0 && (
          <Link to="/checkout" className={styles.sidebarSecondary}>
            Checkout
          </Link>
        )}
      </div>
    </aside>
  );
}

export default CartSidebar;
