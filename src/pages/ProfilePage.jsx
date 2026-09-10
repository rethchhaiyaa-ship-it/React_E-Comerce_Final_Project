import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { mockOrders, products } from "../data/mockData";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ui/ProductCard";
import StarRating from "../components/ui/StarRating";

const IMG = "https://images.unsplash.com/photo-";

const TABS = ["Profile", "My Orders", "Wishlist", "Addresses", "Payment Methods", "Notifications", "Settings"];

const statusColors = {
  Delivered: "bg-success/10 text-success border-success/20",
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  Preparing: "bg-warning/10 text-warning border-warning/20",
  "Out for Delivery": "bg-orange-50 text-primary border-primary/20",
  Cancelled: "bg-danger/10 text-danger border-danger/20",
  Pending: "bg-muted text-muted-fg border-border-custom",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const { wishlist, cart, addToCart } = useApp();
  const navigate = useNavigate();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="bg-card border border-border-custom rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <p className="font-800 text-charcoal">Alex Johnson</p>
                <p className="text-xs text-muted-fg">alex@email.com</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-muted rounded-xl py-2">
                <p className="font-800 text-charcoal">{mockOrders.length}</p>
                <p className="text-muted-fg">Orders</p>
              </div>
              <div className="bg-muted rounded-xl py-2">
                <p className="font-800 text-charcoal">{wishlist.length}</p>
                <p className="text-muted-fg">Wishlist</p>
              </div>
            </div>
          </div>

          <nav className="bg-card border border-border-custom rounded-2xl overflow-hidden">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 text-sm font-700 flex items-center gap-3 border-b border-border-custom last:border-0 transition-colors
                  ${activeTab === tab ? "bg-primary/5 text-primary" : "text-stone hover:bg-muted"}`}
              >
                {tab === "Profile" ? "👤" : tab === "My Orders" ? "📦" : tab === "Wishlist" ? "♡" : tab === "Addresses" ? "📍" : tab === "Payment Methods" ? "💳" : tab === "Notifications" ? "🔔" : "⚙️"}
                {" "}{tab}
              </button>
            ))}
            <button
              onClick={() => navigate("/login")}
              className="w-full text-left px-4 py-3 text-sm font-700 text-danger flex items-center gap-3 hover:bg-danger/5 transition-colors"
            >
              🚪 Logout
            </button>
          </nav>
        </aside>

        {/* Mobile Tab Bar */}
        <div className="lg:hidden w-full">
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-700 transition-colors
                  ${activeTab === tab ? "bg-primary text-white" : "bg-muted text-stone"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {activeTab === "Profile" && (
            <div className="bg-card border border-border-custom rounded-2xl p-8">
              <h1 className="font-display text-2xl text-charcoal mb-6">My Profile</h1>
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl">👤</div>
                <div>
                  <h2 className="font-800 text-charcoal text-xl">Alex Johnson</h2>
                  <p className="text-muted-fg">alex@email.com · +1 555 234 5678</p>
                  <p className="text-xs text-muted-fg mt-1">Member since August 2024</p>
                  <button className="mt-3 bg-primary text-white text-sm font-700 px-5 py-2 rounded-xl hover:bg-primary-dark transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[["Full Name", "Alex Johnson"], ["Email", "alex@email.com"], ["Phone", "+1 555 234 5678"], ["Date of Birth", "May 12, 1992"]].map(([label, val]) => (
                  <div key={label} className="bg-muted rounded-xl px-4 py-3">
                    <p className="text-xs font-700 text-muted-fg uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-charcoal font-600">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "My Orders" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl text-charcoal">My Orders</h1>
                <span className="text-sm text-muted-fg">{mockOrders.length} orders</span>
              </div>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-card border border-border-custom rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="font-800 text-charcoal">{order.id}</p>
                        <p className="text-xs text-muted-fg">{order.date}</p>
                      </div>
                      <span className={`text-xs font-800 px-3 py-1.5 rounded-full border ${statusColors[order.status] || "bg-muted text-muted-fg"}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 mb-4 text-sm">
                      {order.items.map((item) => (
                        <div key={item.name} className="flex justify-between text-stone">
                          <span>{item.name} × {item.qty}</span>
                          <span className="font-700">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border-custom">
                      <div>
                        <span className="text-xs text-muted-fg">Total: </span>
                        <span className="font-900 text-charcoal">${order.total.toFixed(2)}</span>
                        <span className={`ml-2 text-xs font-700 px-2 py-0.5 rounded ${order.paymentStatus === "Paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link to="/order-tracking" className="text-xs font-700 text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">
                          Track
                        </Link>
                        <button className="text-xs font-700 text-charcoal border border-border-custom px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Wishlist" && (
            <div>
              <h1 className="font-display text-2xl text-charcoal mb-6">My Wishlist</h1>
              {wishlisted.length === 0 ? (
                <div className="text-center py-20 bg-card border border-border-custom rounded-2xl">
                  <div className="text-6xl mb-4">♡</div>
                  <h2 className="font-display text-2xl text-charcoal mb-2">Your wishlist is empty</h2>
                  <p className="text-muted-fg mb-6">Save items you love and come back to them later.</p>
                  <Link to="/shop" className="bg-primary text-white font-700 px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors">
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wishlisted.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          )}

          {activeTab === "Addresses" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl text-charcoal">Saved Addresses</h1>
                <button className="bg-primary text-white text-sm font-700 px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors">
                  + Add New
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { type: "Home", name: "Alex Johnson", phone: "+1 555 234 5678", address: "42 Broadway, Manhattan, New York, NY 10001", isDefault: true },
                  { type: "Work", name: "Alex Johnson", phone: "+1 555 234 5678", address: "350 Fifth Ave, Midtown, New York, NY 10118", isDefault: false },
                ].map((addr) => (
                  <div key={addr.type} className={`bg-card rounded-2xl border p-5 ${addr.isDefault ? "border-primary" : "border-border-custom"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-800 px-3 py-1 rounded-full ${addr.isDefault ? "bg-primary text-white" : "bg-muted text-stone"}`}>
                        {addr.type === "Home" ? "🏠" : "🏢"} {addr.type}
                      </span>
                      {addr.isDefault && <span className="text-xs font-700 text-primary">Default</span>}
                    </div>
                    <p className="font-700 text-charcoal">{addr.name}</p>
                    <p className="text-sm text-muted-fg">{addr.phone}</p>
                    <p className="text-sm text-stone mt-1">{addr.address}</p>
                    <div className="flex gap-2 mt-4">
                      <button className="text-xs font-700 text-primary hover:underline">Edit</button>
                      <span className="text-border-custom">·</span>
                      <button className="text-xs font-700 text-danger hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Payment Methods" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl text-charcoal">Payment Methods</h1>
                <button className="bg-primary text-white text-sm font-700 px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors">
                  + Add Card
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { brand: "VISA", last4: "4242", expiry: "09/28", isDefault: true },
                  { brand: "Mastercard", last4: "5678", expiry: "03/27", isDefault: false },
                ].map((card) => (
                  <div key={card.last4} className={`relative overflow-hidden bg-gradient-to-br rounded-2xl border p-5 ${card.isDefault ? "from-charcoal to-stone-700 border-charcoal text-white" : "from-card to-muted border-border-custom text-charcoal"}`}>
                    <div className="flex items-start justify-between mb-8">
                      <span className="font-800 text-lg">{card.brand}</span>
                      {card.isDefault && <span className="text-xs font-700 bg-primary text-white px-2.5 py-1 rounded-full">Default</span>}
                    </div>
                    <p className="font-display text-xl tracking-widest mb-1">•••• •••• •••• {card.last4}</p>
                    <div className="flex justify-between text-sm">
                      <span className="opacity-70">Expires {card.expiry}</span>
                      <span className="font-700">Alex Johnson</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className={`text-xs font-700 hover:underline ${card.isDefault ? "text-white/70" : "text-primary"}`}>Edit</button>
                      <span className="opacity-30">·</span>
                      <button className={`text-xs font-700 hover:underline ${card.isDefault ? "text-red-300" : "text-danger"}`}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl text-charcoal">Notifications</h1>
                <button className="text-sm font-700 text-primary hover:underline">Mark all read</button>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "📦", title: "Order out for delivery", body: "Your order ORD-20260905 is on its way — estimated 12 minutes.", time: "5 min ago", read: false },
                  { icon: "✓", title: "Order confirmed", body: "Restaurant has accepted your order ORD-20260905 and started preparing.", time: "18 min ago", read: false },
                  { icon: "🏷️", title: "New deal: 30% off healthy bowls", body: "Use code HEALTHY30 before Sep 12 for 30% off all healthy bowls.", time: "2 h ago", read: true },
                  { icon: "⭐", title: "Rate your last order", body: "How was the Classic Smash Burger? Leave a quick review.", time: "1 day ago", read: true },
                  { icon: "🎉", title: "Weekend promo is live!", body: "Use WEEKEND20 for 20% off all orders above $30 this weekend.", time: "2 days ago", read: true },
                ].map((n, i) => (
                  <div key={i} className={`flex gap-4 p-4 rounded-2xl border transition-colors ${!n.read ? "bg-primary/5 border-primary/20" : "bg-card border-border-custom"}`}>
                    <span className="text-2xl shrink-0 mt-0.5">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-800 text-sm ${!n.read ? "text-charcoal" : "text-stone"}`}>{n.title}</p>
                        {!n.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                      </div>
                      <p className="text-xs text-muted-fg mt-0.5">{n.body}</p>
                      <p className="text-xs text-muted-fg mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Settings" && (
            <div className="bg-card border border-border-custom rounded-2xl p-8">
              <h1 className="font-display text-2xl text-charcoal mb-6">Account Settings</h1>
              <div className="space-y-5 max-w-md">
                {[
                  { label: "Email notifications", desc: "Receive order updates via email" },
                  { label: "SMS alerts", desc: "Get delivery notifications by text" },
                  { label: "Promotional emails", desc: "Deals, offers, and new items" },
                  { label: "Push notifications", desc: "App alerts when enabled" },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between py-3 border-b border-border-custom last:border-0">
                    <div>
                      <p className="font-700 text-charcoal text-sm">{setting.label}</p>
                      <p className="text-xs text-muted-fg">{setting.desc}</p>
                    </div>
                    <button className="w-12 h-6 bg-primary rounded-full relative transition-colors">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border-custom">
                <h2 className="font-800 text-charcoal mb-3">Danger Zone</h2>
                <button className="text-sm font-700 text-danger border border-danger/30 px-5 py-2.5 rounded-xl hover:bg-danger/5 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}