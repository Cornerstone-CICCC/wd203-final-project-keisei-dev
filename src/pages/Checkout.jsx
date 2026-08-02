import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  function handleConfirm() {
    clearCart();
    navigate("/");
  }

  if (cartItems.length === 0) {
    return (
      <section className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty. Add something from the menu first.</p>
        <Link to="/items" className="button">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="page checkout">
      <h1>Checkout</h1>
      <p className="page__meta">Review your order, then confirm to place it.</p>

      <ul className="checkout__list">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout__item">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p className="checkout__total">Total: ${total.toFixed(2)}</p>

      <button type="button" className="button" onClick={handleConfirm}>
        Confirm
      </button>
    </section>
  );
}

export default Checkout;
