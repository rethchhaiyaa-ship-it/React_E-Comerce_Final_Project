import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { products } from "../data/mockData";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ui/ProductCard";
import StarRating from "../components/ui/StarRating";

const IMG = "https://images.unsplash.com/photo-";

const SIZES = ["Regular", "Large", "Family"];
const SPICE = ["Mild", "Medium", "Hot", "Extra Hot"];
const ADDONS = [
  { label: "Extra Cheese", price: 1.5 },
  { label: "Extra Sauce", price: 0.75 },
  { label: "Extra Meat", price: 2.5 },
  { label: "Soft Drink", price: 2.0 },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const product = products.find((p) => p.id === id);
  const related = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Regular");
  const [spice, setSpice] = useState("Mild");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [notes, setNotes] = useState("");
  const [tab, setTab] = useState("description");
  const [activeImg, setActiveImg] = useState(0);

  const toggleAddon = (label) =>
    setSelectedAddons((prev) => prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]);

  const addonCost = useMemo(() =>
    ADDONS.filter((a) => selectedAddons.includes(a.label)).reduce((s, a) => s + a.price, 0),
    [selectedAddons]
  );
  const sizeUpcharge = size === "Large" ? 2 : size === "Family" ? 5 : 0;
  const totalPrice = product ? (product.price + addonCost + sizeUpcharge) * qty : 0;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🍽️</p>
        <h2 className="font-display text-3xl text-charcoal mb-2">Product not found</h2>
        <Link to="/shop" className="text-primary font-700 hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const images = [product.image, "1565299624946-b28f40a0ae38", "1568901346375-23c9450c58cd"];
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-fg mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <span>/</span>
        <span className="text-charcoal font-600">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted">
            <img
              src={`${IMG}${images[activeImg]}?w=800&h=600&fit=crop&auto=format`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-800 px-3 py-1.5 rounded-full uppercase tracking-wide">
                {product.badge === "bestseller" ? "Best Seller" : product.badge}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative overflow-hidden rounded-xl w-24 h-20 flex-shrink-0 border-2 transition-colors
                  ${activeImg === i ? "border-primary" : "border-transparent"}`}
              >
                <img
                  src={`${IMG}${img}?w=200&h=160&fit=crop&auto=format`}
                  alt=""
                  className="w-full h-full object-cover bg-muted"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal leading-tight">{product.name}</h1>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl border shrink-0 transition-all
                ${wishlisted ? "bg-danger border-danger text-white" : "border-border-custom text-stone hover:border-danger hover:text-danger"}`}
            >
              {wishlisted ? "♥" : "♡"}
            </button>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} size="md" />
              <span className="font-700 text-charcoal">{product.rating}</span>
              <span className="text-muted-fg text-sm">({product.reviews.toLocaleString()} reviews)</span>
            </div>
            {product.prepTime && <span className="text-sm text-muted-fg border-l border-border-custom pl-4">⏱ {product.prepTime}</span>}
            {product.calories && <span className="text-sm text-muted-fg border-l border-border-custom pl-4">🔥 {product.calories} kcal</span>}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl text-primary">${totalPrice.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-fg line-through">${(product.originalPrice * qty).toFixed(2)}</span>
            )}
            {product.originalPrice && (
              <span className="bg-danger/10 text-danger text-sm font-800 px-2 py-0.5 rounded-lg">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {[product.isVeg && "🌿 Vegetarian", product.isVegan && "🌱 Vegan",
              product.isHalal && "✓ Halal", product.isGlutenFree && "🌾 Gluten-Free"].filter(Boolean).map((d) => (
              <span key={d} className="text-xs font-700 bg-green-50 text-success border border-green-200 px-3 py-1 rounded-full">{d}</span>
            ))}
          </div>

          <p className="text-stone text-sm leading-relaxed">{product.description}</p>

          {/* Customization */}
          <div className="space-y-4 bg-muted rounded-2xl p-5">
            <div>
              <p className="font-700 text-charcoal text-sm mb-2">Size</p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-700 border transition-colors
                      ${size === s ? "bg-primary text-white border-primary" : "border-border-custom bg-white text-stone hover:border-primary/50"}`}
                  >
                    {s}{s === "Large" ? " +$2" : s === "Family" ? " +$5" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-700 text-charcoal text-sm mb-2">Spice Level</p>
              <div className="flex gap-2">
                {SPICE.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpice(s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-700 border transition-colors
                      ${spice === s ? "bg-danger text-white border-danger" : "border-border-custom bg-white text-stone hover:border-danger/50"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-700 text-charcoal text-sm mb-2">Add-ons</p>
              <div className="grid grid-cols-2 gap-2">
                {ADDONS.map((a) => (
                  <label key={a.label} className={`flex items-center gap-2 cursor-pointer p-3 rounded-xl border transition-colors
                    ${selectedAddons.includes(a.label) ? "border-primary bg-primary/5" : "border-border-custom bg-white hover:border-primary/40"}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(a.label)}
                      onChange={() => toggleAddon(a.label)}
                      className="accent-primary"
                    />
                    <span className="text-xs font-600 text-charcoal flex-1">{a.label}</span>
                    <span className="text-xs font-700 text-primary">+${a.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="font-700 text-charcoal text-sm mb-2">Special Instructions</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., no onions, extra sauce on the side..."
                className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-primary bg-white"
                rows={2}
              />
            </div>
          </div>

          {/* Qty + Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border-custom rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-11 h-11 flex items-center justify-center text-xl hover:bg-muted transition-colors font-700"
              >
                −
              </button>
              <span className="w-12 text-center font-800 text-charcoal">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-11 h-11 flex items-center justify-center text-xl hover:bg-muted transition-colors font-700"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, qty, { size, spice, addons: selectedAddons.join(", ") })}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-700 py-3.5 rounded-xl transition-all active:scale-95"
            >
              Add to Cart
            </button>

            <Link
              to="/checkout"
              className="flex-1 text-center bg-charcoal hover:bg-stone text-white font-700 py-3.5 rounded-xl transition-all"
            >
              Buy Now
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-fg pt-2">
            <span>✓ In stock</span>
            <span>·</span>
            <span>🚚 Free delivery above $25</span>
            <span>·</span>
            <span>↩ Easy returns</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex border-b border-border-custom mb-8">
          {(["description", "nutrition", "reviews"]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 font-700 text-sm capitalize transition-colors border-b-2
                ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-fg hover:text-charcoal"}`}
            >
              {t === "reviews" ? `Reviews (${product.reviews})` : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "description" && (
          <div className="grid md:grid-cols-2 gap-8 text-sm text-stone leading-relaxed">
            <div>
              <h3 className="font-800 text-charcoal mb-3">About this dish</h3>
              <p className="mb-4">{product.description}. Made fresh to order using the finest seasonal ingredients, sourced locally where possible.</p>
              <h3 className="font-800 text-charcoal mb-3">Ingredients</h3>
              <p>Premium beef patty, aged cheddar, fresh lettuce, ripe tomato, pickles, red onion, house sauce, brioche bun. May contain traces of nuts, gluten, and dairy.</p>
            </div>
            <div>
              <h3 className="font-800 text-charcoal mb-3">Preparation</h3>
              <p>Prepared fresh upon order. Expected ready time: {product.prepTime}. Items may be cooked in shared equipment.</p>
              <h3 className="font-800 text-charcoal mb-3 mt-4">Allergens</h3>
              <div className="flex flex-wrap gap-2">
                {["Gluten", "Dairy", "Egg", "Sesame"].map((a) => (
                  <span key={a} className="bg-warning/10 text-warning text-xs font-700 px-2.5 py-1 rounded-lg border border-warning/30">{a}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "nutrition" && (
          <div className="max-w-md">
            <h3 className="font-800 text-charcoal mb-4">Nutrition Facts (per serving)</h3>
            <div className="border border-border-custom rounded-2xl overflow-hidden">
              {[["Calories", `${product.calories} kcal`], ["Protein", "34g"], ["Carbohydrates", "48g"], ["Fat", "28g"], ["Fiber", "3g"], ["Sodium", "820mg"]].map(([label, val]) => (
                <div key={label} className="flex justify-between px-5 py-3 border-b border-border-custom last:border-0 text-sm">
                  <span className="text-stone">{label}</span>
                  <span className="font-700 text-charcoal">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-5 max-w-2xl">
            {[
              { name: "Sarah M.", rating: 5, date: "Sep 2, 2026", text: "Absolutely incredible. Arrived hot, tasted amazing, will reorder ASAP." },
              { name: "James P.", rating: 5, date: "Aug 28, 2026", text: "Best delivery food I have had in years. The freshness is unreal for a delivery." },
              { name: "Aiko T.", rating: 4, date: "Aug 20, 2026", text: "Really good! Came a bit earlier than expected which was a nice surprise. Loved the portion size." },
            ].map((r) => (
              <div key={r.name} className="bg-card border border-border-custom rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-800 text-charcoal">{r.name}</p>
                    <StarRating rating={r.rating} />
                  </div>
                  <span className="text-xs text-muted-fg">{r.date}</span>
                </div>
                <p className="text-stone text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl text-charcoal mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}