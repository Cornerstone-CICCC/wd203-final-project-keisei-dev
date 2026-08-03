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
      <section className="page page--checkout">
        <header className="page-masthead">
          <p className="page-masthead__eyebrow">Checkout</p>
          <h1 className="page-masthead__title">Almost there</h1>
          <p className="page-masthead__lead">
            Your cart is empty. Add something from the menu before confirming.
          </p>
        </header>
        <div className="page-body">
          <Link to="/items" className="button">
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page page--checkout">
      <header className="page-masthead">
        <p className="page-masthead__eyebrow">Checkout</p>
        <h1 className="page-masthead__title">Confirm your order</h1>
        <p className="page-masthead__lead">
          Take a last look, then confirm. We will clear the cart and send you
          back home.
        </p>
      </header>

      <div className="page-body">
        <div className="order-panel order-panel--ticket">
          <p className="order-panel__stamp">Order ticket</p>
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

          <div className="page-footer-bar">
            <p className="checkout__total">Total: ${total.toFixed(2)}</p>
            <button type="button" className="button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
