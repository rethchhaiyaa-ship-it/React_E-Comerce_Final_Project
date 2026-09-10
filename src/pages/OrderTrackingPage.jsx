import { Link } from "react-router";

const STATUS_STEPS = [
  { label: "Order Placed", desc: "Your order has been received", time: "2:14 PM", done: true },
  { label: "Order Confirmed", desc: "Restaurant accepted your order", time: "2:16 PM", done: true },
  { label: "Preparing", desc: "Your food is being prepared", time: "2:18 PM", done: true },
  { label: "Out for Delivery", desc: "Driver is heading your way", time: "~2:35 PM", done: false, active: true },
  { label: "Delivered", desc: "Enjoy your meal!", time: "", done: false },
];

export default function OrderTrackingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-muted-fg mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/profile" className="hover:text-primary">Orders</Link>
        <span>/</span>
        <span className="text-charcoal font-600">Track Order</span>
      </nav>

      <h1 className="font-display text-3xl text-charcoal mb-8">Order Tracking</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map placeholder */}
          <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl h-56 flex items-center justify-center overflow-hidden border border-border-custom">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 40px,#ccc 40px,#ccc 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#ccc 40px,#ccc 41px)"
            }} />
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-2">🗺️</div>
              <p className="font-700 text-stone">Live Map Tracking</p>
              <p className="text-sm text-muted-fg">Driver is 1.2 km away</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-white rounded-xl px-3 py-2 shadow text-xs font-700 text-charcoal">
              ETA: ~12 min
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-card border border-border-custom rounded-2xl p-6">
            <h2 className="font-800 text-charcoal mb-6">Order Status</h2>
            <div className="relative">
              {STATUS_STEPS.map((s, i) => (
                <div key={s.label} className="flex gap-4 relative">
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`absolute left-5 top-10 bottom-0 w-0.5 -translate-x-px ${s.done ? "bg-success" : "bg-border-custom"}`} style={{ height: "calc(100% - 16px)" }} />
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 text-sm font-800 transition-colors
                    ${s.done ? "bg-success text-white" : s.active ? "bg-primary text-white ring-4 ring-primary/20" : "bg-muted text-muted-fg border border-border-custom"}`}>
                    {s.done ? "✓" : i + 1}
                  </div>
                  <div className={`pb-8 flex-1 ${i === STATUS_STEPS.length - 1 ? "pb-0" : ""}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`font-800 text-sm ${s.done || s.active ? "text-charcoal" : "text-muted-fg"}`}>{s.label}</p>
                        <p className="text-xs text-muted-fg mt-0.5">{s.desc}</p>
                      </div>
                      {s.time && <span className="text-xs text-muted-fg font-600 shrink-0">{s.time}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Order Info */}
          <div className="bg-card border border-border-custom rounded-2xl p-5 text-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-warning/10 text-warning border border-warning/20 px-3 py-1.5 rounded-full text-xs font-800">
                🚴 Out for Delivery
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-fg font-700 uppercase mb-0.5">Order Number</p>
                <p className="font-800 text-charcoal">ORD-20260908</p>
              </div>
              <div>
                <p className="text-xs text-muted-fg font-700 uppercase mb-0.5">Estimated Arrival</p>
                <p className="font-800 text-charcoal">~2:45 PM (12 min)</p>
              </div>
              <div>
                <p className="text-xs text-muted-fg font-700 uppercase mb-0.5">Delivery Address</p>
                <p className="text-stone">42 Broadway, Manhattan, NY</p>
              </div>
            </div>
          </div>

          {/* Driver */}
          <div className="bg-card border border-border-custom rounded-2xl p-5">
            <p className="font-800 text-charcoal mb-3">Your Driver</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">🧑</div>
              <div>
                <p className="font-700 text-charcoal">Marcus Rivera</p>
                <div className="flex items-center gap-1 text-xs text-muted-fg">
                  <span className="text-star">★</span>
                  <span className="font-700">4.96</span>
                  <span>· 2,847 deliveries</span>
                </div>
              </div>
            </div>
            <button className="w-full border border-border-custom hover:bg-muted text-charcoal font-700 text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
              📞 Contact Driver
            </button>
          </div>

          {/* Order Items */}
          <div className="bg-card border border-border-custom rounded-2xl p-5 text-sm">
            <p className="font-800 text-charcoal mb-3">Items Ordered</p>
            {[["Classic Smash Burger ×2", "$25.98"], ["Garlic Parmesan Fries ×1", "$6.49"], ["Mango Passion Smoothie ×1", "$6.99"]].map(([item, price]) => (
              <div key={item} className="flex justify-between py-1.5 border-b border-border-custom last:border-0">
                <span className="text-stone">{item}</span>
                <span className="font-700 text-charcoal">{price}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 font-900 text-charcoal">
              <span>Total</span>
              <span className="text-primary">$43.45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}