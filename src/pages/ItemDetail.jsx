import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import useProducts from "../hooks/useProducts.js";

function ItemDetail() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <section className="page">
        <p className="page__status">Loading item...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page">
        <p className="page__status">Error: {error}</p>
      </section>
    );
  }

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section className="page">
        <header className="page-header">
          <p className="page-header__eyebrow">Menu</p>
          <h1>Item not found</h1>
          <p className="page-header__lead">
            That drink is not on the counter right now.
          </p>
        </header>
        <Link to="/items" className="button">
          Back to Menu
        </Link>
      </section>
    );
  }

  const price = Number(product.price);

  return (
    <section className="page item-detail">
      <Link to="/items" className="item-detail__back">
        ← Back to Menu
      </Link>
      <div className="item-detail__layout">
        <img
          src={product.photo}
          alt={product.name}
          className="item-detail__image"
        />
        <div className="item-detail__content">
          <p className="page-header__eyebrow">Menu item</p>
          <h1>{product.name}</h1>
          <p className="item-detail__price">${price.toFixed(2)}</p>
          <p className="item-detail__desc">{product.desc}</p>
          <button
            type="button"
            className="button"
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
