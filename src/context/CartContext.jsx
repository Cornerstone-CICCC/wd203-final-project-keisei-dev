import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cafe-cart";

function getStoredCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          photo: product.photo,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
