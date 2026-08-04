import styles from "./Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination} aria-label="Menu pagination">
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <ul className={styles.list}>
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={
                page === currentPage
                  ? `${styles.button} ${styles.active}`
                  : styles.button
              }
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
