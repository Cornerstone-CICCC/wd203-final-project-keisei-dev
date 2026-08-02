import { Link, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts.js";

function ItemDetail() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <section className="page">
        <p>Loading item...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page">
        <p>Error: {error}</p>
      </section>
    );
  }

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section className="page">
        <h1>Item Not Found</h1>
        <p>We could not find that menu item.</p>
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
          <h1>{product.name}</h1>
          <p className="item-detail__price">${price.toFixed(2)}</p>
          <p className="item-detail__desc">{product.desc}</p>
        </div>
      </div>
    </section>
  );
}

export default ItemDetail;
