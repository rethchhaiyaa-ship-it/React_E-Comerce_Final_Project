import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🍽️</span>
            <span className="font-display text-xl text-white">Foodi<span className="text-primary">·</span></span>
          </Link>
          <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
            Premium food delivered to your door. Fresh ingredients, fast delivery, and a marketplace you can trust.
          </p>
          <div className="flex gap-3 mt-5">
            {["𝕏", "f", "in", "▶"].map((s, i) => (
              <button key={i} className="w-9 h-9 bg-white/10 hover:bg-primary text-white rounded-xl text-sm font-700 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-800 text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[["Home", "/"], ["Shop", "/shop"], ["Deals", "/deals"], ["About", "/about"], ["Contact", "/contact"]].map(([l, p]) => (
              <li key={p}><Link to={p} className="hover:text-primary transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-800 text-sm mb-4 uppercase tracking-wider">Categories</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {["Burgers", "Pizza", "Chicken", "Asian Food", "Desserts", "Drinks"].map((c) => (
              <li key={c}><Link to={`/shop?category=${c.toLowerCase()}`} className="hover:text-primary transition-colors">{c}</Link></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-800 text-sm mb-4 uppercase tracking-wider">Support</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {["FAQ", "Track Order", "Return Policy", "Privacy Policy", "Terms & Conditions"].map((l) => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
          <div className="mt-5 text-sm space-y-1.5 text-stone-400">
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ hello@foodi.com</p>
            <p>📍 New York, NY 10001</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">© 2026 Foodi. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {["VISA", "MC", "AMEX", "PayPal", "Apple Pay"].map((p) => (
              <span key={p} className="bg-white/10 text-white/70 text-[10px] font-800 px-2 py-1 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}