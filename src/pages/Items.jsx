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
        <p className="page__status">Loading menu...</p>
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

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="page page--menu">
      <header className="page-header page-header--split">
        <div className="page-header__copy">
          <p className="page-header__eyebrow">Menu</p>
          <h1>From the counter</h1>
          <p className="page-header__lead">
            Coffee and tea, ready to order. Choose a cup and add it to your
            cart.
          </p>
          <p className="page__meta">
            Showing {startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of{" "}
            {products.length}
          </p>
        </div>
        <aside className="page-header__note" aria-hidden="true">
          <p>Espresso, milk drinks, and tea — ordered one cup at a time.</p>
        </aside>
      </header>

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
