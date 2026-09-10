import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useApp } from "../../context/AppContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Deals", path: "/deals" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const { cartCount, wishlist } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQ)}`);
      setSearchOpen(false);
      setSearchQ("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-custom">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🍽️</span>
            <span className="font-display text-xl text-charcoal">
              Foodi<span className="text-primary">·</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`px-3 py-1.5 text-sm font-700 rounded-lg transition-colors
                  ${pathname === l.path ? "bg-primary/10 text-primary" : "text-stone hover:text-primary hover:bg-primary/5"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Location */}
          <button className="hidden lg:flex items-center gap-1.5 text-sm text-muted-fg hover:text-primary transition-colors">
            <span>📍</span>
            <span className="font-600">Phnom Penh</span>
            <span className="text-xs">▾</span>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-stone"
              aria-label="Search"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              to="/wishlist"
              className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-stone"
              aria-label="Wishlist"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger text-white text-[10px] font-800 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-stone"
              aria-label="Cart"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-800 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl hover:bg-muted transition-colors text-stone"
              aria-label="Profile"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <Link
              to="/login"
              className="hidden md:inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-700 px-4 py-1.5 rounded-xl transition-colors ml-1"
            >
              Sign In
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
              aria-label="Menu"
            >
              <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border-custom px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 text-sm font-700 rounded-lg transition-colors
                  ${pathname === l.path ? "bg-primary/10 text-primary" : "text-stone hover:bg-muted"}`}
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-border-custom mt-2 pt-2 flex gap-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center bg-primary text-white text-sm font-700 py-2.5 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center border border-border-custom text-charcoal text-sm font-700 py-2.5 rounded-xl"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/60 flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                autoFocus
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search for food, dishes, restaurants..."
                className="flex-1 border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-700 px-5 py-3 rounded-xl transition-colors"
              >
                Search
              </button>
            </form>
            <div className="mt-4">
              <p className="text-xs font-700 text-muted-fg uppercase tracking-wide mb-2">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {["Burger", "Pizza", "Chicken", "Sushi", "Noodles", "Dessert"].map((q) => (
                  <button
                    key={q}
                    onClick={() => { navigate(`/shop?q=${q}`); setSearchOpen(false); }}
                    className="px-3 py-1.5 bg-muted text-stone text-sm font-600 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}