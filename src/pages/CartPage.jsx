import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { products } from "../data/mockData";
import ProductCard from "../components/ui/ProductCard";

const IMG = "https://images.unsplash.com/photo-";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, toggleWishlist, cartTotal, clearCart, showToast } = useApp();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const deliveryFee = cartTotal >= 25 ? 0 : 3.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal - discount + deliveryFee + tax;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "WEEKEND20") {
      const d = cartTotal * 0.2;
      setDiscount(d);
      showToast("Promo code applied! 20% discount");
    } else if (promoCode.toUpperCase() === "FREESHIP") {
      showToast("Free shipping applied!");
    } else {
      showToast("Invalid promo code", "error");
    }
  };

  const recommended = products.filter((p) => !cart.find((c) => c.product.id === p.id)).slice(0, 4);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="font-display text-3xl text-charcoal mb-3">Your cart is empty</h2>
        <p className="text-muted-fg mb-8">Looks like you haven't added anything yet. Let's fix that!</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-700 px-8 py-4 rounded-xl transition-colors"
        >
          Browse Menu
        </Link>
        <div className="mt-16">
          <h3 className="font-display text-2xl text-charcoal mb-6">You might like these</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-muted-fg mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-charcoal font-600">Cart</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-charcoal">Shopping Cart <span className="text-muted-fg text-xl font-body font-600">({cart.length} {cart.length === 1 ? "item" : "items"})</span></h1>
        <button onClick={clearCart} className="text-sm text-danger hover:underline font-700">Clear all</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map(({ product, quantity, options }) => {
            const itemTotal = product.price * quantity;
            return (
              <div key={product.id} className="bg-card border border-border-custom rounded-2xl p-4 flex gap-4">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img
                    src={`${IMG}${product.image}?w=160&h=120&fit=crop&auto=format`}
                    alt={product.name}
                    className="w-28 h-24 object-cover rounded-xl bg-muted"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/product/${product.id}`} className="font-800 text-charcoal hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </Link>
                      {options && Object.entries(options).filter(([, v]) => v).map(([k, v]) => (
                        <p key={k} className="text-xs text-muted-fg capitalize">{k}: {v}</p>
                      ))}
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-muted-fg hover:text-danger transition-colors shrink-0 p-1">✕</button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border-custom rounded-xl overflow-hidden">
                      <button
                        onClick={() => quantity > 1 ? updateQty(product.id, quantity - 1) : removeFromCart(product.id)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors font-700"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-800 text-charcoal text-sm">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors font-700"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-sm text-muted-fg hover:text-danger transition-colors"
                      >
                        ♡ Save
                      </button>
                      <span className="font-900 text-charcoal">${itemTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-700 text-sm hover:underline mt-2">
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border-custom rounded-2xl p-6 sticky top-24">
            <h2 className="font-800 text-charcoal text-lg mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-fg">Subtotal</span>
                <span className="font-700">${cartTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span className="font-700">−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-fg">Delivery</span>
                <span className="font-700">{deliveryFee === 0 ? <span className="text-success">Free</span> : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-fg">Tax (8%)</span>
                <span className="font-700">${tax.toFixed(2)}</span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-muted-fg bg-muted rounded-lg px-3 py-2">
                  Add ${(25 - cartTotal).toFixed(2)} more for free delivery
                </p>
              )}
            </div>

            <div className="border-t border-border-custom mt-4 pt-4 flex justify-between items-baseline">
              <span className="font-800 text-charcoal">Total</span>
              <span className="font-display text-2xl text-primary">${total.toFixed(2)}</span>
            </div>

            {/* Promo Code */}
            <div className="mt-5 flex gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 border border-border-custom rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
              <button
                onClick={applyPromo}
                className="bg-charcoal hover:bg-stone text-white text-sm font-700 px-4 py-2.5 rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-5 bg-primary hover:bg-primary-dark text-white font-700 py-4 rounded-xl transition-all active:scale-95 text-center"
            >
              Proceed to Checkout →
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-fg">
              <span>🔒</span>
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended */}
      {recommended.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-2xl text-charcoal mb-6">Frequently bought together</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}