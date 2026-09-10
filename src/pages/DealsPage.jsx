import { useState } from "react";
import { Link } from "react-router";
import { deals } from "../data/mockData";
import { useApp } from "../context/AppContext";

const IMG = "https://images.unsplash.com/photo-";

export default function DealsPage() {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    showToast(`Code "${code}" copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-muted-fg mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-charcoal font-600">Deals</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">Limited Time</p>
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal">Deals & Promotions</h1>
        <p className="text-muted-fg mt-3">Use these exclusive codes at checkout and save big on your next order.</p>
      </div>

      {/* Hero Deal */}
      <div className="relative overflow-hidden rounded-3xl mb-10">
        <img src={`${IMG}1504674900247-0877df9cc836?w=1400&h=400&fit=crop&auto=format`} alt="Weekend deal" className="w-full h-64 object-cover bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <span className="text-5xl font-display text-white font-bold">20% OFF</span>
            <p className="text-stone-300 text-lg mt-1">All orders above $30 this weekend</p>
            <div className="flex items-center gap-3 mt-4">
              <code className="bg-white/20 text-white font-800 text-lg px-4 py-2 rounded-xl border border-white/30">WEEKEND20</code>
              <button
                onClick={() => copyCode("WEEKEND20")}
                className="bg-primary hover:bg-primary-dark text-white font-700 px-5 py-2.5 rounded-xl transition-colors"
              >
                {copied === "WEEKEND20" ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-card border border-border-custom rounded-2xl overflow-hidden hover:shadow-md transition-all">
            <div className="relative h-36 overflow-hidden">
              <img
                src={`${IMG}${deal.image}?w=400&h=280&fit=crop&auto=format`}
                alt={deal.title}
                className="w-full h-full object-cover bg-muted"
              />
              <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
                <span className="text-white font-display text-3xl font-bold">{deal.discount}</span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-800 text-charcoal mb-1">{deal.title}</h3>
              <p className="text-sm text-muted-fg mb-4">{deal.description}</p>

              <div className="bg-muted rounded-xl p-3 flex items-center justify-between mb-3">
                <code className="font-800 text-charcoal text-sm">{deal.code}</code>
                <button
                  onClick={() => copyCode(deal.code)}
                  className={`text-xs font-700 px-3 py-1.5 rounded-lg transition-colors
                    ${copied === deal.code ? "bg-success text-white" : "bg-white border border-border-custom text-charcoal hover:border-primary"}`}
                >
                  {copied === deal.code ? "Copied!" : "Copy"}
                </button>
              </div>

              <p className="text-xs text-muted-fg mb-3">⏰ Expires {deal.expires}</p>

              <Link
                to="/shop"
                className="block text-center bg-primary hover:bg-primary-dark text-white font-700 text-sm py-2.5 rounded-xl transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Extra deals */}
      <div className="mt-12">
        <h2 className="font-display text-2xl text-charcoal mb-6">Loyalty Rewards</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: "🌟", title: "Bronze Member", desc: "0–9 orders", benefit: "Free dessert on 5th order" },
            { icon: "🥈", title: "Silver Member", desc: "10–24 orders", benefit: "10% off every order" },
            { icon: "🥇", title: "Gold Member", desc: "25+ orders", benefit: "Free delivery + 15% off" },
          ].map((tier) => (
            <div key={tier.title} className="bg-card border border-border-custom rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">{tier.icon}</div>
              <h3 className="font-800 text-charcoal">{tier.title}</h3>
              <p className="text-xs text-muted-fg mb-2">{tier.desc}</p>
              <p className="text-sm font-700 text-primary">{tier.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}