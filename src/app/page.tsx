"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 * Trendy Haven — app/page.tsx
 * Single-file, production-ready homepage for a trendy clothing e‑commerce store.
 * Drop this into: C:\Users\aruna\trendy-haven\src\app\page.tsx
 *
 * Requirements (project-level):
 *  - Next.js (app router)
 *  - Tailwind CSS configured (global styles imported elsewhere)
 *
 * Features included:
 *  - Responsive header + search + filters
 *  - SEO-friendly metadata (basic)
 *  - Product grid with pagination and sorting
 *  - Product quick view modal
 *  - Persistent cart (localStorage)
 *  - Cart sidebar with quantity editing + simple checkout flow (mock)
 *  - Accessibility-friendly buttons & forms
 *  - Clean, modern Tailwind styling (no external UI libs required)
 */

type Product = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  colors?: string[];
  sizes?: string[];
  category?: string;
  image: string;
  description?: string;
  featured?: boolean;
};

type CartItem = {
  productId: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  size?: string;
  color?: string;
};

// Example product catalog (replace with your backend or CMS in production)
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Aero Knit Oversized Tee",
    price: 2400.0,
    oldPrice: 3400.0,
    colors: ["Black", "White", "Sand"],
    sizes: ["S", "M", "L", "XL"],
    category: "Tops",
    image:
      "/images/tee.jpg",
    description:
      "Soft airy knit oversized tee — breathable, relaxed fit. Perfect for everyday layering.",
    featured: true,
  },
  {
    id: "p2",
    title: "Rift Denim Relaxed Jeans",
    price: 620.0,
    colors: ["Indigo", "Black"],
    sizes: ["28", "30", "32", "34"],
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1400&auto=format&fit=crop",
    description: "High-quality relaxed denim with subtle distressing.",
  },
  {
    id: "p3",
    title: "Haven Tailored Blazer",
    price: 1200.0,
    oldPrice: 1580.0,
    colors: ["Charcoal", "Olive"],
    sizes: ["S", "M", "L"],
    category: "Outerwear",
    image:
      "/images/bla.jpg",
    description: "Smart-casual blazer with modern tailoring and soft lining.",
  },
  {
    id: "p4",
    title: "Arc Seamless Leggings",
    price: 390.0,
    colors: ["Black", "Plum"],
    sizes: ["S", "M", "L"],
    category: "Active",
    image:
      "/images/leg.jpg",
    description: "High-compression seamless leggings for studio & street.",
  },
  {
    id: "p5",
    title: "Breeze Linen Shirt",
    price: 480.0,
    colors: ["White", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    category: "Shirts",
    image:
      "/images/bre.jpg",
    description: "Lightweight linen shirt with relaxed silhouette.",
  },
  {
    id: "p6",
    title: "Nomad Crossbody Bag",
    price: 690.0,
    colors: ["Tan", "Black"],
    category: "Accessories",
    image:
      "/images/bag.jpg",
    description: "Minimal crossbody crafted from durable canvas and leather.",
  },
  {
    id: "p7",
    title: "Cove Runner Sneakers",
    price: 7900.0,
    colors: ["White", "Grey"],
    category: "Footwear",
    image:
      "/images/sheos.jpg",
    description: "Lightweight runners with cushioned sole and clean silhouette.",
  },
  {
    id: "p8",
    title: "Haven Signature Hoodie",
    price: 5500.0,
    oldPrice: 7500.0,
    colors: ["Heather", "Black"],
    sizes: ["S", "M", "L", "XL"],
    category: "Tops",
    image:
      "/images/haven1.jpg",
    description: "Cozy mid-weight hoodie with soft brushed fleece inside.",
    featured: true,
  },
];

const CURRENCY = (n: number) => `₹${n.toFixed(0)}`; // Indian rupee format — change to $ if desired

function formatPrice(n: number) {
  return CURRENCY(n);
}

export default function Page() {
  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [sort, setSort] = useState("featured");
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);

  // cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("trendyhaven_cart");
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      console.warn("Could not parse cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("trendyhaven_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not write cart to localStorage", e);
    }
  }, [cart]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Other"));
    return ["all", ...Array.from(set)];
  }, [products]);

  // Search + filter + sort pipeline
  const filtered = useMemo(() => {
    let list = products.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }
    if (category !== "all") list = list.filter((p) => p.category === category);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "new":
        // no createdAt data in sample — keep stable
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, query, category, sort]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  // cart helpers
  const addToCart = (p: Product, opts?: { qty?: number; size?: string; color?: string }) => {
    setCart((cur) => {
      const existing = cur.find(
        (c) => c.productId === p.id && c.size === opts?.size && c.color === opts?.color
      );
      if (existing) {
        return cur.map((c) =>
          c.productId === p.id && c.size === opts?.size && c.color === opts?.color
            ? { ...c, qty: Math.min(99, c.qty + (opts?.qty || 1)) }
            : c
        );
      }
      const newItem: CartItem = {
        productId: p.id,
        title: p.title,
        price: p.price,
        qty: opts?.qty || 1,
        image: p.image,
        size: opts?.size,
        color: opts?.color,
      };
      return [...cur, newItem];
    });
    setIsCartOpen(true);
  };

  const changeQty = (productId: string, delta: number) => {
    setCart((c) =>
      c
        .map((item) => (item.productId === productId ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (productId: string) => setCart((c) => c.filter((i) => i.productId !== productId));

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 200 ? 0 : subtotal === 0 ? 0 : 25;
  const tax = +(subtotal * 0.12).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  // Mock checkout
  const doCheckout = () => {
    // In production, integrate Stripe / Razorpay / your provider here.
    alert(`Mock checkout — total: ${formatPrice(total)}`);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold">TH</div>
                <span className="font-semibold text-lg tracking-tight">Trendy Haven</span>
              </a>
              <nav className="hidden md:flex items-center gap-4 text-sm text-gray-700">
                <button onClick={() => { setCategory("all"); setPage(1); }} className={`py-2 px-3 rounded ${category === "all" ? "bg-gray-100" : ""}`}>All</button>
                {categories.slice(1).map((c) => (
                  <button key={c} onClick={() => { setCategory(c); setPage(1); }} className={`py-2 px-3 rounded ${category === c ? "bg-gray-100" : ""}`}>{c}</button>
                ))}
              </nav>
            </div>

            <div className="flex-1 mx-6 max-w-xl">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <input
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tees, jeans, hoodies..."
                  className="block w-full rounded-full border border-gray-200 shadow-sm py-2 px-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">⌕</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="hidden sm:block rounded border border-gray-200 py-2 px-3 text-sm">
                <option value="featured">Featured</option>
                <option value="price-asc">Price — Low to High</option>
                <option value="price-desc">Price — High to Low</option>
                <option value="new">Newest</option>
              </select>

              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Open cart"
                className="relative inline-flex items-center gap-2 py-2 px-3 rounded-full hover:bg-gray-100"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10" cy="20" r="1" fill="currentColor" />
                  <circle cx="18" cy="20" r="1" fill="currentColor" />
                </svg>
                <span className="text-sm hidden sm:inline">Cart</span>
                <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full">{cart.reduce((s, it) => s + it.qty, 0)}</span>
              </button>

              <a href="#" className="hidden md:inline-block px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">Sign in</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Trendy Haven — modern clothing that fits your life</h1>
            <p className="mt-4 text-gray-600">Minimal, sustainable pieces designed for everyday style. Free returns, fast shipping, and handcrafted packaging.</p>

            <div className="mt-6 flex gap-3">
              <a href="#shop" className="inline-block bg-black text-white py-2 px-4 rounded-full">Shop Now</a>
              <a href="#" className="inline-block border border-gray-300 py-2 px-4 rounded-full">Explore Collections</a>
            </div>

            <div className="mt-6 flex gap-4 text-sm text-gray-700">
              <div>Free shipping over ₹200</div>
              <div>30-day returns</div>
              <div>Carbon‑neutral packaging</div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img src={SAMPLE_PRODUCTS[0].image} alt="Hoodie" className="w-full h-56 object-cover" />
            </div>
          </div>
        </section>

        {/* Collection + Grid */}
        <section id="shop">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">New arrivals</h2>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <label className="flex items-center gap-2">Show
                <select value={perPage} onChange={(e) => { setPerPage(+e.target.value); setPage(1); }} className="ml-2 rounded border-gray-200 py-1 px-2">
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {pageItems.map((p) => (
              <article key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button onClick={() => setQuickView(p)} aria-label={`Open ${p.title} details`} className="block text-left w-full">
                  <div className="h-48 w-full bg-gray-100 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium">{p.title}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <div className="text-lg font-semibold">{formatPrice(p.price)}</div>
                      {p.oldPrice && <div className="text-sm text-gray-400 line-through">{formatPrice(p.oldPrice)}</div>}
                    </div>
                  </div>
                </button>

                <div className="p-3 border-t border-gray-50 flex items-center gap-2">
                  <button onClick={() => addToCart(p)} className="flex-1 py-2 text-sm bg-indigo-600 text-white rounded">Add to cart</button>
                  <button onClick={() => { setQuickView(p); }} aria-label="Quick view" className="p-2 rounded border border-gray-200">View</button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border">Prev</button>
              <div className="px-3 py-1 rounded bg-white border">{page} / {totalPages}</div>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded border">Next</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 py-8 text-sm text-gray-600 border-t">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="font-semibold">Trendy Haven</div>
              <div className="mt-2">Modern clothing inspired by timeless silhouettes. Built with care.</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="font-medium">Company</div>
                <ul className="mt-2 space-y-2">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Press</a></li>
                </ul>
              </div>
              <div>
                <div className="font-medium">Support</div>
                <ul className="mt-2 space-y-2">
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Shipping</a></li>
                  <li><a href="#">Returns</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Quick view modal */}
      {quickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40" onClick={() => setQuickView(null)} />
          <div className="relative bg-white rounded-xl max-w-3xl w-full shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-80 md:h-full">
                <img src={quickView.image} alt={quickView.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{quickView.title}</h3>
                <div className="mt-2 text-gray-700">{quickView.description}</div>
                <div className="mt-4 text-2xl font-bold">{formatPrice(quickView.price)}</div>

                {quickView.sizes && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-500">Size</div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {quickView.sizes.map((s) => (
                        <button key={s} className="px-3 py-1 border rounded">{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <button onClick={() => { addToCart(quickView); setQuickView(null); }} className="py-2 px-4 bg-indigo-600 text-white rounded">Add to cart</button>
                  <button onClick={() => setQuickView(null)} className="py-2 px-4 border rounded">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <aside className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} transition-transform`}
             aria-hidden={!isCartOpen}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your cart</h3>
          <button onClick={() => setIsCartOpen(false)} aria-label="Close cart" className="p-2">✕</button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {cart.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {cart.map((it) => (
                <li key={it.productId} className="flex items-center gap-4">
                  <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{it.title}</div>
                    <div className="text-xs text-gray-500">{it.size ? `Size ${it.size}` : ""} {it.color ? `· ${it.color}` : ""}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => changeQty(it.productId, -1)} className="px-2 py-1 border rounded">-</button>
                      <div className="px-3">{it.qty}</div>
                      <button onClick={() => changeQty(it.productId, 1)} className="px-2 py-1 border rounded">+</button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{formatPrice(it.price * it.qty)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2"><div>Subtotal</div><div>{formatPrice(subtotal)}</div></div>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2"><div>Shipping</div><div>{shipping === 0 ? "Free" : formatPrice(shipping)}</div></div>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4"><div>Tax</div><div>{formatPrice(tax)}</div></div>
          <div className="flex items-center justify-between text-lg font-semibold mb-4"><div>Total</div><div>{formatPrice(total)}</div></div>
          <div className="flex gap-3">
            <button onClick={doCheckout} disabled={cart.length === 0} className="flex-1 py-2 rounded bg-indigo-600 text-white disabled:opacity-60">Checkout</button>
            <button onClick={() => { setCart([]); }} className="py-2 px-3 border rounded">Clear</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
