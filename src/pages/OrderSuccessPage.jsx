import { Link } from "react-router";

export default function OrderSuccessPage() {
  const orderNum = "ORD-" + Math.floor(Math.random() * 90000 + 10000);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl mb-6 animate-bounce">🎉</div>
      <div className="inline-flex items-center gap-2 bg-success/10 text-success px-5 py-2 rounded-full font-700 text-sm mb-5 border border-success/20">
        ✓ Order Confirmed
      </div>

      <h1 className="font-display text-4xl sm:text-5xl text-charcoal mb-3">Your order is in!</h1>
      <p className="text-muted-fg text-lg mb-8">
        Hang tight — your food is being prepared and will be on its way soon.
      </p>

      <div className="bg-card border border-border-custom rounded-2xl p-8 mb-8 text-left">
        <div className="grid sm:grid-cols-2 gap-5 text-sm">
          <div>
            <p className="text-xs font-700 text-muted-fg uppercase tracking-wide mb-1">Order Number</p>
            <p className="font-800 text-charcoal text-lg">{orderNum}</p>
          </div>
          <div>
            <p className="text-xs font-700 text-muted-fg uppercase tracking-wide mb-1">Estimated Delivery</p>
            <p className="font-800 text-charcoal text-lg">30–45 minutes</p>
          </div>
          <div>
            <p className="text-xs font-700 text-muted-fg uppercase tracking-wide mb-1">Delivery Address</p>
            <p className="text-stone">42 Broadway, Manhattan, New York</p>
          </div>
          <div>
            <p className="text-xs font-700 text-muted-fg uppercase tracking-wide mb-1">Payment</p>
            <p className="text-stone">💳 Credit Card •••• 4242</p>
          </div>
        </div>

        <div className="border-t border-border-custom mt-6 pt-6">
          <div className="space-y-3 text-sm text-muted-fg">
            <div className="flex justify-between">
              <span>Subtotal</span><span className="text-charcoal font-700">$39.97</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span><span className="text-charcoal font-700">$3.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span><span className="text-charcoal font-700">$3.20</span>
            </div>
            <div className="flex justify-between font-900 text-charcoal text-base border-t border-border-custom pt-3">
              <span>Total</span><span className="text-primary">$47.16</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/order-tracking"
          className="flex-1 bg-primary hover:bg-primary-dark text-white font-700 py-4 rounded-xl transition-colors text-center"
        >
          Track Order
        </Link>
        <Link
          to="/shop"
          className="flex-1 border border-border-custom text-charcoal font-700 py-4 rounded-xl hover:bg-muted transition-colors text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}