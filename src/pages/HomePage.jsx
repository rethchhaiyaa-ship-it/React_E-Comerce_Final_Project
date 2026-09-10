import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { products, categories, deals, reviews } from "../data/mockData";
import ProductCard from "../components/ui/ProductCard";
import StarRating from "../components/ui/StarRating";

const IMG = "https://images.unsplash.com/photo-";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [searchQ, setSearchQ] = useState("");

  const popularProducts = products.filter((p) => p.badge === "bestseller" || p.badge === "popular").slice(0, 4);

  return (
    <div className="font-body">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        <div
          className="absolute inset-0 bg-charcoal"
          style={{
            backgroundImage: `url(${IMG}1504674900247-0877df9cc836?w=1600&h=900&fit=crop&auto=format)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-light px-4 py-2 rounded-full text-sm font-700 mb-6">
              🔥 Free delivery on your first order
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.08] mb-5">
              Delicious food,<br />
              <span className="text-primary">delivered</span> to<br />
              your door.
            </h1>

            <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-md">
              Discover thousands of dishes from the best restaurants and home chefs near you, delivered hot and fresh.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); navigate(`/shop?q=${searchQ}`); }}
              className="flex gap-2 bg-white rounded-2xl p-2 shadow-2xl mb-8 max-w-lg"
            >
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search for food, dishes, restaurants..."
                className="flex-1 px-4 py-2.5 text-sm text-charcoal placeholder:text-muted-fg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-700 px-5 py-2.5 rounded-xl transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-700 px-7 py-3.5 rounded-xl transition-all active:scale-95"
              >
                Order Now
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 text-white font-700 px-7 py-3.5 rounded-xl border border-white/30 transition-colors backdrop-blur-sm"
              >
                Explore Menu
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-8">
              {[["30 min", "Fast delivery"], ["1,200+", "Menu items"], ["4.9★", "Average rating"]].map(([stat, label]) => (
                <div key={label}>
                  <p className="text-white font-800 text-xl">{stat}</p>
                  <p className="text-stone-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">Browse by category</p>
            <h2 className="font-display text-3xl sm:text-4xl text-charcoal">What are you craving?</h2>
          </div>
          <Link to="/shop" className="text-primary font-700 text-sm hover:underline hidden sm:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="group flex flex-col items-center bg-card border border-border-custom rounded-2xl p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="relative mb-3 overflow-hidden rounded-xl w-full aspect-square">
                <img
                  src={`${IMG}${cat.image}?w=200&h=200&fit=crop&auto=format`}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-muted"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-2xl">{cat.emoji}</span>
              </div>
              <span className="font-700 text-charcoal text-sm text-center">{cat.name}</span>
              <span className="text-muted-fg text-xs mt-0.5">{cat.count} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ── */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">Trending now</p>
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal">Most loved dishes</h2>
            </div>
            <Link to="/shop" className="text-primary font-700 text-sm hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── DEALS BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">Save big today</p>
            <h2 className="font-display text-3xl sm:text-4xl text-charcoal">Deals & Promotions</h2>
          </div>
          <Link to="/deals" className="text-primary font-700 text-sm hover:underline hidden sm:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((deal, i) => (
            <div
              key={deal.id}
              className={`relative overflow-hidden rounded-2xl p-6 flex flex-col gap-3
                ${i % 2 === 0 ? "bg-primary text-white" : "bg-charcoal text-white"}`}
            >
              <span className="text-4xl font-display font-bold leading-none">{deal.discount}</span>
              <div>
                <h3 className="font-800 text-lg leading-snug">{deal.title}</h3>
                <p className="text-white/70 text-sm mt-1">{deal.description}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/20">
                <code className="text-sm font-800 bg-white/20 px-2 py-1 rounded">{deal.code}</code>
                <span className="text-xs text-white/60">Ends {deal.expires}</span>
              </div>
              <Link
                to="/deals"
                className="block text-center text-sm font-700 bg-white/20 hover:bg-white/30 py-2 rounded-xl transition-colors"
              >
                Shop Now →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">Handpicked for you</p>
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal">Featured this week</h2>
            </div>
            <Link to="/shop" className="text-primary font-700 text-sm hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(4, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">Why Foodi</p>
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal">The way food delivery should be</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { icon: "⚡", title: "Fast Delivery", desc: "Under 30 minutes, guaranteed or money back" },
            { icon: "🥦", title: "Fresh Ingredients", desc: "Every dish made fresh to your order, never frozen" },
            { icon: "🔒", title: "Secure Payment", desc: "Bank-level encryption on every transaction" },
            { icon: "📱", title: "Easy Ordering", desc: "Order in 3 taps, track in real time" },
            { icon: "💬", title: "24/7 Support", desc: "Real humans, always available, always helpful" },
          ].map((f) => (
            <div key={f.title} className="text-center bg-card border border-border-custom rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-800 text-charcoal mb-1">{f.title}</h3>
              <p className="text-muted-fg text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── APP BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-charcoal rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `url(${IMG}1414235077428-338989a2e8c0?w=1200&fit=crop&auto=format)`, backgroundSize: "cover" }} />
          <div className="relative z-10 px-8 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-primary font-700 text-sm uppercase tracking-widest mb-2">Get the app</p>
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-3">Order faster with our app</h2>
              <p className="text-stone-400 max-w-sm">Track your order live, save favourites, and get app-exclusive deals delivered daily.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {["App Store", "Google Play"].map((s) => (
                <button key={s} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3.5 rounded-xl transition-colors">
                  <span className="text-2xl">{s === "App Store" ? "🍎" : "▶️"}</span>
                  <div className="text-left">
                    <p className="text-[10px] text-white/60">Download on the</p>
                    <p className="font-800 text-sm">{s}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">Testimonials</p>
            <h2 className="font-display text-3xl sm:text-4xl text-charcoal">What our customers say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r) => (
              <div key={r.id} className="bg-card border border-border-custom rounded-2xl p-6 flex flex-col gap-4">
                <StarRating rating={r.rating} size="md" />
                <p className="text-charcoal text-sm leading-relaxed flex-1">"{r.comment}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border-custom">
                  <img
                    src={`${IMG}${r.avatar}?w=80&h=80&fit=crop&auto=format`}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover bg-muted"
                  />
                  <div>
                    <p className="font-800 text-charcoal text-sm">{r.name}</p>
                    <p className="text-xs text-muted-fg">{r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-primary rounded-3xl px-8 py-14 text-center">
          <p className="text-white/80 font-700 text-sm uppercase tracking-widest mb-2">Newsletter</p>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-3">Get the freshest deals</h2>
          <p className="text-white/70 mb-8">Subscribe and never miss a promo, new dish, or exclusive offer again.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-xl text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-charcoal hover:bg-stone text-white font-700 px-7 py-3.5 rounded-xl transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}