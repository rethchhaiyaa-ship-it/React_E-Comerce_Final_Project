import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const addToCart = useCallback((product, qty = 1, options) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { product, quantity: qty, options }];
    });
    showToast(`${product.name} added to cart`);
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    showToast("Item removed from cart", "info");
  }, [showToast]);

  const updateQty = useCallback((productId, qty) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((i) => i.product.id === productId ? { ...i, quantity: qty } : i));
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      const isIn = prev.includes(productId);
      showToast(isIn ? "Removed from wishlist" : "Added to wishlist", "info");
      return isIn ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  }, [showToast]);

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart, wishlist, toasts, cartCount, cartTotal,
      addToCart, removeFromCart, updateQty,
      toggleWishlist, isWishlisted, showToast, clearCart,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}