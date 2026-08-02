import { useState } from "react";
import Pagination from "../components/Pagination.jsx";
import ProductCard from "../components/ProductCard.jsx";
import useProducts from "../hooks/useProducts.js";

const ITEMS_PER_PAGE = 8;

function Items() {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="page">
      <h1>Menu</h1>
      <p className="page__meta">
        Showing {startIndex + 1}-
        {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of{" "}
        {products.length} items
      </p>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default Items;
