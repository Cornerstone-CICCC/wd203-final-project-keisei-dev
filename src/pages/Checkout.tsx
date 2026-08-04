import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import page from "../styles/page.module.css";
import shared from "../styles/shared.module.css";
import styles from "./Checkout.module.css";

function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  function handleConfirm() {
    clearCart();
    navigate("/");
  }

  if (cartItems.length === 0) {
    return (
      <section>
        <header className={page.masthead}>
          <p className={page.eyebrow}>Checkout</p>
          <h1 className={page.title}>Almost there</h1>
          <p className={page.lead}>
            Your cart is empty. Add something from the menu before confirming.
          </p>
        </header>
        <div className={page.body}>
          <Link to="/items" className={shared.button}>
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <header className={page.masthead}>
        <p className={page.eyebrow}>Checkout</p>
        <h1 className={page.title}>Confirm your order</h1>
        <p className={page.lead}>
          Take a last look, then confirm. We will clear the cart and send you
          back home.
        </p>
      </header>

      <div className={page.body}>
        <div className={`${page.orderPanel} ${page.orderPanelTicket}`}>
          <p className={page.stamp}>Order ticket</p>
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className={page.footerBar}>
            <p className={styles.total}>Total: ${total.toFixed(2)}</p>
            <button
              type="button"
              className={page.footerAction}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
