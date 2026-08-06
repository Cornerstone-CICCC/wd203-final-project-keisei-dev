import { Link, useLocation, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useProducts from "../hooks/useProducts";
import page from "../styles/page.module.css";
import shared from "../styles/shared.module.css";
import styles from "./ItemDetail.module.css";

type ItemDetailState = { backTo?: string } | null;

function ItemDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const backTo = (state as ItemDetailState)?.backTo ?? "/items";

  if (loading) {
    return (
      <section>
        <p className={page.status}>Loading item...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className={page.status}>Error: {error}</p>
      </section>
    );
  }

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section>
        <header className={styles.missing}>
          <p className={styles.eyebrow}>Menu</p>
          <h1 className={page.title}>Item not found</h1>
          <p className={styles.missingLead}>
            That drink is not on the counter right now.
          </p>
        </header>
        <Link to={backTo} className={shared.button}>
          Back to Menu
        </Link>
      </section>
    );
  }

  const price = Number(product.price);

  return (
    <section className={styles.detail}>
      <Link to={backTo} className={styles.back}>
        ← Back to Menu
      </Link>
      <div className={styles.layout}>
        <img
          src={product.photo}
          alt={product.name}
          className={styles.image}
          fetchPriority="high"
          decoding="async"
        />
        <div>
          <p className={styles.contentEyebrow}>Menu item</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>${price.toFixed(2)}</p>
          <p className={styles.desc}>{product.desc}</p>
          <button
            type="button"
            className={styles.button}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ItemDetail;
