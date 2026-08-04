import { Link } from "react-router-dom";
import type { Product } from "../types";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  /** Where "back" should lead, so the visitor returns to the page they came from. */
  backTo?: string;
};

function ProductCard({ product, backTo }: ProductCardProps) {
  const price = Number(product.price);

  return (
    <article className={styles.card}>
      <Link
        to={`/items/${product.id}`}
        state={backTo ? { backTo } : undefined}
        className={styles.link}
      >
        <div className={styles.media}>
          <img src={product.photo} alt={product.name} className={styles.image} />
        </div>
        <div className={styles.body}>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.price}>${price.toFixed(2)}</p>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
