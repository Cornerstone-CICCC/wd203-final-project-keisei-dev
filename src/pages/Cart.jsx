import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
  const { cartItems, total, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="page">
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/items" className="button">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Cart</h1>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-list__item">
            <img
              src={item.photo}
              alt={item.name}
              className="cart-list__image"
            />
            <div className="cart-list__info">
              <h2>{item.name}</h2>
              <p>
                ${item.price.toFixed(2)} × {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-list__total">Total: ${total.toFixed(2)}</p>
      <Link to="/checkout" className="button">
        Go to Checkout
      </Link>
    </section>
  );
}

export default Cart;
