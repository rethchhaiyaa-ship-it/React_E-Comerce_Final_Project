import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useApp } from "../context/AppContext";

const IMG = "https://images.unsplash.com/photo-";

const STEPS = ["Delivery", "Payment", "Review", "Confirmation"];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "Alex Johnson", phone: "+1 555 234 5678", email: "alex@email.com", address: "42 Broadway", city: "New York", district: "Manhattan", street: "Broadway", house: "42", instructions: "" });
  const [addressType, setAddressType] = useState("Home");
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });

  const deliveryFee = delivery === "express" ? 7.99 : delivery === "pickup" ? 0 : 3.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;

  const up = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const SummaryPanel = () => (
    <div className="bg-card border border-border-custom rounded-2xl p-5">
      <h3 className="font-800 text-charcoal mb-4">Your Order</h3>
      {cart.map(({ product, quantity }) => (
        <div key={product.id} className="flex items-center gap-3 mb-3">
          <img src={`${IMG}${product.image}?w=60&h=60&fit=crop&auto=format`} alt="" className="w-12 h-12 rounded-xl object-cover bg-muted" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-700 text-charcoal line-clamp-1">{product.name}</p>
            <p className="text-xs text-muted-fg">Qty: {quantity}</p>
          </div>
          <span className="text-sm font-800 text-charcoal">${(product.price * quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="border-t border-border-custom mt-3 pt-3 space-y-1.5 text-sm">
        <div className="flex justify-between text-muted-fg"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-muted-fg"><span>Delivery</span><span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span></div>
        <div className="flex justify-between text-muted-fg"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between font-900 text-charcoal text-base pt-1 border-t border-border-custom">
          <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const Input = ({ label, field, type = "text", placeholder = "" }) => (
    <div>
      <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={up(field)}
        placeholder={placeholder}
        className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-muted-fg mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-primary">Cart</Link>
        <span>/</span>
        <span className="text-charcoal font-600">Checkout</span>
      </nav>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex flex-col items-center ${i < STEPS.length - 1 ? "relative" : ""}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-800 transition-colors
                ${i < step ? "bg-success text-white" : i === step ? "bg-primary text-white" : "bg-muted text-muted-fg"}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-700 mt-1.5 hidden sm:block ${i === step ? "text-primary" : "text-muted-fg"}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-16 sm:w-24 mx-1 ${i < step ? "bg-success" : "bg-border-custom"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* STEP 0: Delivery */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="bg-card border border-border-custom rounded-2xl p-6">
                <h2 className="font-display text-xl text-charcoal mb-5">Delivery Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" field="name" />
                  <Input label="Phone" field="phone" type="tel" />
                  <Input label="Email" field="email" type="email" />
                  <Input label="City" field="city" />
                  <Input label="District" field="district" />
                  <Input label="Street" field="street" />
                  <Input label="House Number" field="house" />
                  <div className="sm:col-span-2">
                    <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1">Address Label</label>
                    <div className="flex gap-2">
                      {["Home", "Work", "Other"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setAddressType(t)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-700 border transition-colors
                            ${addressType === t ? "bg-primary text-white border-primary" : "border-border-custom text-stone hover:border-primary/50"}`}
                        >
                          {t === "Home" ? "🏠 " : t === "Work" ? "🏢 " : "📍 "}{t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1">Delivery Instructions</label>
                    <textarea
                      value={form.instructions}
                      onChange={up("instructions")}
                      placeholder="Ring bell, leave at door, call on arrival..."
                      rows={2}
                      className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border-custom rounded-2xl p-6">
                <h2 className="font-display text-xl text-charcoal mb-5">Delivery Option</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { id: "standard", label: "Standard Delivery", desc: "30-45 minutes", price: "$3.99" },
                    { id: "express", label: "Express Delivery", desc: "15-20 minutes", price: "$7.99" },
                    { id: "pickup", label: "Pickup", desc: "Ready in 15 minutes", price: "Free" },
                  ].map((opt) => (
                    <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors
                      ${delivery === opt.id ? "border-primary bg-primary/5" : "border-border-custom hover:border-primary/40"}`}>
                      <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id} onChange={(e) => setDelivery(e.target.value)} className="accent-primary" />
                      <div className="flex-1">
                        <p className="font-700 text-charcoal text-sm">{opt.label}</p>
                        <p className="text-xs text-muted-fg">{opt.desc}</p>
                      </div>
                      <span className="font-800 text-charcoal text-sm">{opt.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={() => setStep(1)} className="w-full bg-primary hover:bg-primary-dark text-white font-700 py-4 rounded-xl transition-colors">
                Continue to Payment →
              </button>
            </div>
          )}

          {/* STEP 1: Payment */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-card border border-border-custom rounded-2xl p-6">
                <h2 className="font-display text-xl text-charcoal mb-5">Payment Method</h2>
                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { id: "card", label: "Credit / Debit Card", icon: "💳" },
                    { id: "cod", label: "Cash on Delivery", icon: "💵" },
                    { id: "wallet", label: "Digital Wallet", icon: "📱" },
                    { id: "bank", label: "Bank Transfer", icon: "🏦" },
                  ].map((opt) => (
                    <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors
                      ${payment === opt.id ? "border-primary bg-primary/5" : "border-border-custom hover:border-primary/40"}`}>
                      <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={(e) => setPayment(e.target.value)} className="accent-primary" />
                      <span className="text-xl">{opt.icon}</span>
                      <span className="font-700 text-charcoal text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="grid sm:grid-cols-2 gap-4 border-t border-border-custom pt-5">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1">Card Number</label>
                      <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="1234 5678 9012 3456"
                        className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1">Expiry</label>
                      <input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY"
                        className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1">CVV</label>
                      <input value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} placeholder="•••"
                        className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-700 text-muted-fg uppercase tracking-wide block mb-1">Cardholder Name</label>
                      <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Alex Johnson"
                        className="w-full border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 border border-border-custom text-charcoal font-700 py-4 rounded-xl hover:bg-muted transition-colors">
                  ← Back
                </button>
                <button onClick={() => setStep(2)} className="flex-[2] bg-primary hover:bg-primary-dark text-white font-700 py-4 rounded-xl transition-colors">
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Review */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-card border border-border-custom rounded-2xl p-6">
                <h2 className="font-display text-xl text-charcoal mb-5">Review Your Order</h2>

                <div className="grid sm:grid-cols-2 gap-5 mb-5 pb-5 border-b border-border-custom text-sm">
                  <div>
                    <p className="font-700 text-charcoal mb-1">Delivery Address</p>
                    <p className="text-stone">{form.name}</p>
                    <p className="text-muted-fg">{form.house} {form.street}, {form.district}</p>
                    <p className="text-muted-fg">{form.city}</p>
                    <p className="text-muted-fg">{form.phone}</p>
                  </div>
                  <div>
                    <p className="font-700 text-charcoal mb-1">Payment</p>
                    <p className="text-stone capitalize">{payment === "card" ? "💳 Credit/Debit Card" : payment === "cod" ? "💵 Cash on Delivery" : "📱 Digital Wallet"}</p>
                    <p className="mt-3 font-700 text-charcoal">Delivery</p>
                    <p className="text-stone capitalize">{delivery} delivery</p>
                  </div>
                </div>

                <SummaryPanel />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-border-custom text-charcoal font-700 py-4 rounded-xl hover:bg-muted transition-colors">
                  ← Back
                </button>
                <button
                  onClick={() => { clearCart(); navigate("/order-success"); }}
                  className="flex-[2] bg-primary hover:bg-primary-dark text-white font-700 py-4 rounded-xl transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <SummaryPanel />
          <div className="mt-4 text-xs text-muted-fg text-center flex items-center justify-center gap-1.5">
            <span>🔒</span>
            <span>Secured by 256-bit SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}