import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartSidebar() {
  const { pathname } = useLocation();
  const { cartItems, total, itemCount, removeFromCart } = useCart();
  const isHome = pathname === "/";

  if (isHome) {
    const hasItems = cartItems.length > 0;
    const preview = hasItems
      ? cartItems
          .slice(0, 1)
          .map((item) => `${item.name} ×${item.quantity}`)
          .join(", ")
      : "Add a drink from the menu.";
    const extra =
      cartItems.length > 1 ? ` +${cartItems.length - 1} more` : "";

    return (
      <aside className="cart-dock" aria-label="Shopping cart">
        <div className="cart-dock__tab">
          <span className="cart-dock__tab-label">Cart</span>
          <span className="cart-dock__badge" aria-live="polite">
            {itemCount}
          </span>
          <span className="cart-dock__tab-total">${total.toFixed(2)}</span>
        </div>

        <div className="cart-dock__panel">
          <div className="cart-dock__panel-inner">
            <p className="cart-dock__preview">
              {preview}
              {extra}
            </p>
            <div className="cart-dock__total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <Link to="/cart" className="button button--light cart-dock__button">
              {hasItems ? "View cart" : "Open cart"}
            </Link>
          </div>
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
