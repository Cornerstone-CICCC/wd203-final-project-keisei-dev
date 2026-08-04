import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import page from "../styles/page.module.css";
import shared from "../styles/shared.module.css";
import styles from "./Cart.module.css";

function Cart() {
  const { cartItems, total, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <section>
        <header className={page.masthead}>
          <p className={page.eyebrow}>Cart</p>
          <h1 className={page.title}>Your order</h1>
          <p className={page.lead}>
            Nothing here yet. Browse the menu and pick something for the
            counter.
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
        <p className={page.eyebrow}>Cart</p>
        <h1 className={page.title}>Your order</h1>
        <p className={page.lead}>
          Review what you have, remove anything you do not want, then continue
          to checkout.
        </p>
      </header>

      <div className={page.body}>
        <div className={page.orderPanel}>
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <img src={item.photo} alt={item.name} className={styles.image} />
                <div className={styles.info}>
                  <h2>{item.name}</h2>
                  <p>
                    ${item.price.toFixed(2)} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className={page.footerBar}>
            <p className={styles.total}>Total: ${total.toFixed(2)}</p>
            <Link to="/checkout" className={page.footerAction}>
              Go to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
