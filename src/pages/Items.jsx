import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

function Items() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="page">
        <p>Loading menu...</p>
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

  return (
    <section className="page">
      <h1>Menu</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Items;
