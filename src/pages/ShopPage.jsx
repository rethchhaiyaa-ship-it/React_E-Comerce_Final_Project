import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { products, categories } from "../data/mockData";
import ProductCard from "../components/ui/ProductCard";

const sortOptions = ["Recommended", "Popular", "Price: Low to High", "Price: High to Low", "Highest Rated", "Newest"];

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("Recommended");
  const [viewGrid, setViewGrid] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [minRating, setMinRating] = useState(0);
  const [activeCategory, setActiveCategory] = useState(params.get("category") || "");
  const [dietary, setDietary] = useState([]);
  const [page, setPage] = useState(1);

  const q = params.get("q") || "";
  const PER_PAGE = 8;

  const toggleDietary = (d) => setDietary((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()));
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (minRating) list = list.filter((p) => p.rating >= minRating);
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (dietary.includes("veg")) list = list.filter((p) => p.isVeg || p.isVegan);
    if (dietary.includes("vegan")) list = list.filter((p) => p.isVegan);
    if (dietary.includes("halal")) list = list.filter((p) => p.isHalal);
    if (dietary.includes("glutenFree")) list = list.filter((p) => p.isGlutenFree);

    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    else if (sort === "Highest Rated") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "Popular") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [q, activeCategory, minRating, priceRange, dietary, sort]);

  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-800 text-charcoal text-sm uppercase tracking-wide mb-3">Categories</h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => { setActiveCategory(""); setPage(1); }}
            className={`text-left px-3 py-2 rounded-xl text-sm font-600 transition-colors
              ${!activeCategory ? "bg-primary text-white" : "text-stone hover:bg-muted"}`}
          >
            All Items
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setActiveCategory(c.id); setPage(1); }}
              className={`text-left px-3 py-2 rounded-xl text-sm font-600 flex justify-between transition-colors
                ${activeCategory === c.id ? "bg-primary text-white" : "text-stone hover:bg-muted"}`}
            >
              <span>{c.emoji} {c.name}</span>
              <span className={activeCategory === c.id ? "text-white/70" : "text-muted-fg"}>{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-800 text-charcoal text-sm uppercase tracking-wide mb-3">Price Range</h3>
        <div className="flex items-center gap-2 text-sm text-charcoal mb-2">
          <span>${priceRange[0]}</span>
          <span className="flex-1 text-center text-muted-fg">to</span>
          <span>${priceRange[1]}</span>
        </div>
        <input type="range" min={0} max={50} value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full accent-primary" />
      </div>

      {/* Min Rating */}
      <div>
        <h3 className="font-800 text-charcoal text-sm uppercase tracking-wide mb-3">Minimum Rating</h3>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-700 transition-colors
                ${minRating === r ? "bg-primary text-white" : "bg-muted text-stone hover:bg-primary/10"}`}
            >
              {r === 0 ? "Any" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary */}
      <div>
        <h3 className="font-800 text-charcoal text-sm uppercase tracking-wide mb-3">Dietary</h3>
        <div className="flex flex-col gap-2">
          {[["veg", "Vegetarian"], ["vegan", "Vegan"], ["halal", "Halal"], ["glutenFree", "Gluten-Free"]].map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dietary.includes(key)}
                onChange={() => toggleDietary(key)}
                className="accent-primary"
              />
              <span className="text-sm text-stone">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => { setActiveCategory(""); setMinRating(0); setPriceRange([0, 50]); setDietary([]); setPage(1); }}
        className="w-full py-2.5 border border-border-custom rounded-xl text-sm font-700 text-stone hover:bg-muted transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-fg mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-primary">Home</a>
        <span>/</span>
        <span className="text-charcoal font-600">Shop</span>
        {q && <><span>/</span><span className="text-charcoal font-600">"{q}"</span></>}
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-charcoal">{q ? `Results for "${q}"` : "All Food Items"}</h1>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="lg:hidden flex items-center gap-2 border border-border-custom px-4 py-2 rounded-xl text-sm font-700"
        >
          ☰ Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`shrink-0 w-64 ${filterOpen ? "fixed inset-0 z-50 bg-white overflow-y-auto p-6 lg:relative lg:block lg:bg-transparent lg:p-0 lg:z-auto" : "hidden lg:block"}`}>
          {filterOpen && (
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="font-800 text-charcoal">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="text-xl">✕</button>
            </div>
          )}
          <FilterPanel />
        </aside>

        {/* Product Area */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <p className="text-sm text-muted-fg">
              Showing <span className="font-700 text-charcoal">{filtered.length}</span> items
            </p>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-border-custom rounded-xl px-3 py-2 text-sm font-600 focus:outline-none focus:border-primary bg-white"
              >
                {sortOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
              <div className="flex border border-border-custom rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewGrid(true)}
                  className={`px-3 py-2 text-sm transition-colors ${viewGrid ? "bg-primary text-white" : "text-stone hover:bg-muted"}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewGrid(false)}
                  className={`px-3 py-2 text-sm transition-colors ${!viewGrid ? "bg-primary text-white" : "text-stone hover:bg-muted"}`}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-6xl mb-4">🍽️</p>
              <h2 className="font-display text-2xl text-charcoal mb-2">No food found</h2>
              <p className="text-muted-fg">Try adjusting your filters or search a different term.</p>
            </div>
          ) : (
            <div className={viewGrid ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" : "flex flex-col gap-4"}>
              {paged.map((p) =>
                viewGrid ? (
                  <ProductCard key={p.id} product={p} />
                ) : (
                  <div key={p.id} className="bg-card border border-border-custom rounded-2xl p-4 flex gap-4">
                    <img
                      src={`https://images.unsplash.com/photo-${p.image}?w=160&h=120&fit=crop&auto=format`}
                      alt={p.name}
                      className="w-32 h-24 object-cover rounded-xl bg-muted shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-800 text-charcoal">{p.name}</h3>
                      <p className="text-muted-fg text-sm mt-0.5 line-clamp-2">{p.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-star">★</span>
                        <span className="text-sm font-700">{p.rating}</span>
                        <span className="text-muted-fg text-sm">({p.reviews})</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <span className="font-900 text-primary text-lg">${p.price}</span>
                      <button
                        onClick={() => {}}
                        className="bg-primary hover:bg-primary-dark text-white text-sm font-700 px-4 py-2 rounded-xl transition-colors"
                      >
                        Add +
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-border-custom text-sm font-700 disabled:opacity-40 hover:bg-muted transition-colors"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-700 transition-colors
                    ${p === page ? "bg-primary text-white" : "border border-border-custom hover:bg-muted"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-border-custom text-sm font-700 disabled:opacity-40 hover:bg-muted transition-colors"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}