import { Link } from "react-router";
import { useApp } from "../../context/AppContext";
import StarRating from "./StarRating";

const IMG = "https://images.unsplash.com/photo-";

const badgeColors = {
  bestseller: "bg-primary text-white",
  popular: "bg-orange-100 text-primary-dark",
  new: "bg-success text-white",
};

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-border-custom flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={`${IMG}${product.image}?w=400&h=280&fit=crop&auto=format`}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 bg-muted"
          />
        </Link>
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-800 rounded-full uppercase tracking-wide ${badgeColors[product.badge]}`}>
            {product.badge === "bestseller" ? "Best Seller" : product.badge === "popular" ? "Popular" : "New"}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-12 bg-danger text-white text-[11px] font-800 px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
            ${wishlisted ? "bg-danger text-white" : "bg-white/90 text-stone-400 hover:bg-white hover:text-danger"}`}
          aria-label="Toggle wishlist"
        >
          {wishlisted ? "♥" : "♡"}
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-stone-700 text-white px-4 py-2 rounded-full text-sm font-700">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-1">
          {product.isVeg && <span className="text-[10px] bg-green-50 text-success px-2 py-0.5 rounded-full font-700 border border-green-200">VEG</span>}
          {product.isVegan && <span className="text-[10px] bg-green-50 text-success px-2 py-0.5 rounded-full font-700 border border-green-200">VEGAN</span>}
          {product.isHalal && <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-700 border border-blue-200">HALAL</span>}
        </div>

        <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-800 text-charcoal leading-snug line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-muted-fg text-xs mt-1 line-clamp-2 leading-relaxed flex-1">{product.description}</p>

        <div className="flex items-center gap-1.5 mt-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs font-700 text-charcoal">{product.rating}</span>
          <span className="text-xs text-muted-fg">({product.reviews.toLocaleString()})</span>
          {product.prepTime && (
            <span className="ml-auto text-xs text-muted-fg">⏱ {product.prepTime}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-900 text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-fg line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-700 px-4 py-2 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}