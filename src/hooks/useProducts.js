import { useEffect, useState } from "react";

// The menu is the same for the whole visit, so it is kept in memory. A remount
// (going Back to the list, for example) can then paint the grid right away
// instead of showing the loading state and collapsing the page height.
let cache = null;
let request = null;

function fetchProducts() {
  if (cache) {
    return Promise.resolve(cache);
  }

  if (!request) {
    request = fetch("/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json();
      })
      .then((data) => {
        cache = data.products;
        request = null;
        return cache;
      })
      .catch((err) => {
        request = null;
        throw err;
      });
  }

  return request;
}

function useProducts() {
  const [products, setProducts] = useState(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) {
      return undefined;
    }

    let active = true;

    fetchProducts()
      .then((items) => {
        if (active) {
          setProducts(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}

export default useProducts;
