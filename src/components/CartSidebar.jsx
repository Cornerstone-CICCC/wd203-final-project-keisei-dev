import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartSidebar() {
  const { cartItems, total, removeFromCart } = useCart();

  return (
    <aside className="cart-sidebar">
      <h2 className="cart-sidebar__title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="cart-sidebar__empty">Cart is empty.</p>
      ) : (
        <ul className="cart-sidebar__list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-sidebar__item">
              <div>
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
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="cart-sidebar__total">Total: ${total.toFixed(2)}</p>
      <Link to="/cart" className="button cart-sidebar__link">
        View Cart
      </Link>
    </aside>
  );
}

export default CartSidebar;
