import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="font-display text-xl text-white">Foodi<span className="text-primary">·</span></span>
          </Link>
          <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
            Premium food delivered to your door. Fresh ingredients, fast delivery, and a marketplace you can trust.
          </p>
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
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +855 965184321
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              hello@foodi.com
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Phnom Penh, Cambodia
            </p>
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