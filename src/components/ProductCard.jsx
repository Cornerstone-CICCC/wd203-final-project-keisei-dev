import { Link } from "react-router-dom";

function ProductCard({ product, backTo }) {
  const price = Number(product.price);

  return (
    <article className="product-card">
      <Link
        to={`/items/${product.id}`}
        state={backTo ? { backTo } : undefined}
        className="product-card__link"
      >
        <div className="product-card__media">
          <img
            src={product.photo}
            alt={product.name}
            className="product-card__image"
          />
        </div>
        <div className="product-card__body">
          <h2 className="product-card__name">{product.name}</h2>
          <p className="product-card__price">${price.toFixed(2)}</p>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
