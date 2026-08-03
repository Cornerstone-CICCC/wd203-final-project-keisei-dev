import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartSidebar() {
  const { pathname } = useLocation();
  const { cartItems, total, itemCount, removeFromCart } = useCart();
  const isHome = pathname === "/";
  const dockRef = useRef(null);

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
      <aside className="cart-dock" aria-label="Shopping cart" ref={dockRef}>
        <div className="cart-dock__header">
          <h2 className="cart-dock__title">Cart</h2>
          <span className="cart-dock__badge" aria-live="polite">
            {itemCount}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-dock__empty">
            Your cart is empty. Browse the menu to add something.
          </p>
        ) : (
          <ul className="cart-dock__list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-dock__item">
                <div className="cart-dock__item-copy">
                  <p className="cart-dock__name">{item.name}</p>
                  <p className="cart-dock__meta">
                    ×{item.quantity} · $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  className="cart-dock__remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-dock__footer">
          <p className="cart-dock__total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </p>
          <Link to="/cart" className="button button--light cart-dock__button">
            {itemCount > 0 ? "View cart" : "Open cart"}
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className="cart-sidebar" aria-label="Shopping cart">
      <div className="cart-sidebar__header">
        <h2 className="cart-sidebar__title">Your cart</h2>
        <span className="cart-sidebar__badge" aria-live="polite">
          {itemCount}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <p className="cart-sidebar__empty">
          Your cart is empty. Browse the menu to add something.
        </p>
      ) : (
        <ul className="cart-sidebar__list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-sidebar__item">
              <div className="cart-sidebar__item-copy">
                <p className="cart-sidebar__name">{item.name}</p>
                <p className="cart-sidebar__meta">
                  ×{item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                className="cart-sidebar__remove"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-sidebar__footer">
        <p className="cart-sidebar__total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </p>
        <Link to="/cart" className="button cart-sidebar__link">
          View cart
        </Link>
        {itemCount > 0 && (
          <Link to="/checkout" className="cart-sidebar__secondary">
            Checkout
          </Link>
        )}
      </div>
    </aside>
  );
}

export default CartSidebar;
