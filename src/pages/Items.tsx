import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import page from "../styles/page.module.css";
import styles from "./Items.module.css";

const ITEMS_PER_PAGE = 8;

function Items() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  if (loading) {
    return (
      <section>
        <p className={page.status}>Loading menu...</p>
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

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const requestedPage = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  function handlePageChange(nextPage: number) {
    setSearchParams(nextPage === 1 ? {} : { page: String(nextPage) });
  }

  return (
    <section>
      <header className={page.masthead}>
        <p className={page.eyebrow}>Menu</p>
        <h1 className={page.title}>From the counter</h1>
        <p className={page.lead}>
          Coffee and tea, ready to order. Choose a cup and add it to your cart.
        </p>
      </header>

      <div className={page.body}>
        <div className={page.bar}>
          <p className={page.meta}>
            Showing {startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of{" "}
            {products.length}
          </p>
          <p className={page.aside}>
            Espresso, milk drinks, and tea — one cup at a time.
          </p>
        </div>

        <div className={styles.grid}>
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              backTo={currentPage === 1 ? "/items" : `/items?page=${currentPage}`}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default Items;
