import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <div className="text-8xl mb-6">🍽️</div>
      <h1 className="font-display text-5xl text-charcoal mb-3">404</h1>
      <p className="font-display text-2xl text-charcoal mb-2">Page not found</p>
      <p className="text-muted-fg mb-8">
        Looks like this dish isn't on our menu. Let's get you back to something delicious.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="bg-primary hover:bg-primary-dark text-white font-700 px-8 py-3.5 rounded-xl transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/shop"
          className="border border-border-custom text-charcoal font-700 px-8 py-3.5 rounded-xl hover:bg-muted transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    </div>
  );
}