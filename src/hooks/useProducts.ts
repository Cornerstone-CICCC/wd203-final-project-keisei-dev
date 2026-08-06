import { useEffect, useState } from "react";
import type { Product } from "../types";

type UseProducts = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

// The menu is the same for the whole visit, so it is kept in memory. A remount
// (going Back to the list, for example) can then paint the grid right away
// instead of showing the loading state and collapsing the page height.
let cache: Product[] | null = null;
let request: Promise<Product[]> | null = null;

function fetchProducts(): Promise<Product[]> {
  if (cache) {
    return Promise.resolve(cache);
  }

  if (!request) {
    request = fetch("/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json() as Promise<{ products: Product[] }>;
      })
      .then((data) => {
        // Serve optimized copies from /public so the menu is not waiting on
        // dozens of third-party image hosts.
        cache = data.products.map((product) => ({
          ...product,
          photo: `/images/products/${product.id}.jpg`,
        }));
        request = null;
        return cache;
      })
      .catch((err: unknown) => {
        request = null;
        throw err;
      });
  }

  return request;
}

function useProducts(): UseProducts {
  const [products, setProducts] = useState<Product[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

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
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load products");
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
