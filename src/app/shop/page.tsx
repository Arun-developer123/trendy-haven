"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Heart, ShoppingCart, X } from "lucide-react";

// ===== Types =====
type Product = {
  id: string;
  name: string;
  price: number; // in cents or rupees (we use rupees here)
  description?: string;
  sizes?: string[];
  colors?: string[];
  imageSeed?: string; // used to generate image url
  featured?: boolean;
};

type CartItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  size?: string;
  color?: string;
  image?: string;
};

// ===== Sample product data (replace with your real API/backend) =====
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Classic White Tee",
    price: 499,
    description: "Premium cotton tee with a comfortable relaxed fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    imageSeed: "classic-white-tee",
    featured: true,
  },
  {
    id: "p2",
    name: "Denim Jacket",
    price: 2499,
    description: "Lightweight denim jacket with vintage wash.",
    sizes: ["M", "L", "XL"],
    colors: ["Blue", "Black"],
    imageSeed: "denim-jacket",
    featured: true,
  },
  {
    id: "p3",
    name: "Chill Joggers",
    price: 899,
    description: "Soft stretch joggers — lounge or run errands in style.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey", "Olive"],
    imageSeed: "chill-joggers",
  },
  {
    id: "p4",
    name: "Floral Midi Dress",
    price: 1999,
    description: "Flowy midi dress with easy-care fabric.",
    sizes: ["S", "M", "L"],
    colors: ["Multicolor"],
    imageSeed: "floral-dress",
  },
  {
    id: "p5",
    name: "Ribbed Tank Top",
    price: 349,
    description: "Layering essential with a ribbed finish.",
    sizes: ["S", "M", "L"],
    colors: ["White", "Black", "Beige"],
    imageSeed: "ribbed-tank",
  },
  {
    id: "p6",
    name: "Utility Cargo Pants",
    price: 1599,
    description: "Functional cargo pants with tapered fit.",
    sizes: ["M", "L", "XL"],
    colors: ["Khaki", "Black"],
    imageSeed: "cargo-pants",
  },
];

// Helper: generate a stable placeholder image URL using picsum with a seed
const imageUrlFromSeed = (seed?: string, size = 600) => {
  if (!seed) return `https://picsum.photos/${size}`;
  // create a number from the seed for consistent picsum image
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) % 1000;
  const id = 10 + (n % 90);
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${size}`;
};

// Currency formatter for INR
const formatINR = (n: number) => {
  return `₹${n.toLocaleString("en-IN")}`;
};

export default function ShopPage(): JSX.Element {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    // load cart from localStorage (simple persistence)
    try {
      const raw = localStorage.getItem("trendy-haven-cart");
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load cart", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("trendy-haven-cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to save cart", e);
    }
  }, [cart]);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) || (p.description || "").toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "featured") list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [products, query, sort]);

  function addToCart(product: Product, qty = 1, opts?: { size?: string; color?: string }) {
    setCart((prev) => {
      const existing = prev.find((it) => it.productId === product.id && it.size === opts?.size && it.color === opts?.color);
      if (existing) {
        return prev.map((it) =>
          it.productId === existing.productId && it.size === existing.size && it.color === existing.color
            ? { ...it, qty: it.qty + qty }
            : it
        );
      }
      const item: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
        size: opts?.size,
        color: opts?.color,
        image: imageUrlFromSeed(product.imageSeed, 400),
      };
      return [item, ...prev];
    });
  }

  function removeFromCart(productId: string, size?: string, color?: string) {
    setCart((prev) => prev.filter((it) => !(it.productId === productId && it.size === size && it.color === color)));
  }

  function updateQty(productId: string, delta: number, size?: string, color?: string) {
    setCart((prev) =>
      prev
        .map((it) => (it.productId === productId && it.size === size && it.color === color ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter(Boolean)
    );
  }

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Trendy Haven</h1>
            <p className="text-sm text-gray-600 mt-1">Contemporary clothing made for real life.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 border rounded-2xl px-3 py-2 bg-white shadow-sm">
              <input
                type="search"
                aria-label="Search products"
                placeholder="Search tees, jackets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="outline-none text-sm w-48"
              />
              <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="text-sm bg-transparent outline-none">
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow hover:shadow-md"
            >
              <ShoppingCart size={18} />
              <span className="text-sm font-medium">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full bg-rose-600 text-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Grid + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="p-4 bg-white rounded-2xl shadow">
                <h3 className="font-semibold">Filters</h3>
                <p className="text-sm text-gray-500 mt-1">(Quick filter demo — hook to backend as needed)</p>
                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" /> <span>New arrivals</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" /> <span>On sale</span>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl shadow">
                <h4 className="font-medium">Price range</h4>
                <div className="mt-3 flex items-center gap-2">
                  <input type="range" min={0} max={5000} defaultValue={3000} className="w-full" />
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">All Products</h2>
                <p className="text-sm text-gray-500">{filtered.length} results</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <article key={p.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-full h-56 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={imageUrlFromSeed(p.imageSeed, 600)}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' alignment-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='#9ca3af'>Image</text></svg>`)} `;
                      }}
                    />

                    {p.featured && <span className="absolute left-3 top-3 bg-amber-400 text-xs font-semibold px-2 py-1 rounded">Featured</span>}
                  </div>

                  <div className="mt-3">
                    <h3 className="text-sm font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-lg font-bold">{formatINR(p.price)}</div>
                      <div className="flex items-center gap-2">
                        <button
                          aria-label={`Like ${p.name}`}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Heart size={16} />
                        </button>

                        <button
                          onClick={() => setSelected(p)}
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-rose-600 text-white font-medium"
                        >
                          <ShoppingCart size={14} /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Product modal / quick add */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
              <div className="p-4 border-b flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selected.name}</h3>
                  <p className="text-sm text-gray-500">{formatINR(selected.price)}</p>
                </div>
                <button onClick={() => setSelected(null)} aria-label="Close" className="p-2 rounded-lg hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden bg-gray-100">
                  <img src={imageUrlFromSeed(selected.imageSeed, 800)} alt={selected.name} className="w-full h-96 object-cover" />
                </div>

                <div>
                  <p className="text-sm text-gray-700 mb-4">{selected.description}</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Size</label>
                      <div className="mt-2 flex gap-2">
                        {(selected.sizes || []).map((s) => (
                          <button key={s} className="px-3 py-1.5 border rounded-full text-sm">{s}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Color</label>
                      <div className="mt-2 flex gap-2">
                        {(selected.colors || []).map((c) => (
                          <button key={c} className="px-3 py-1.5 border rounded-full text-sm">{c}</button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => addToCart(selected, 1)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-rose-600 text-white font-medium"
                      >
                        <ShoppingCart size={16} /> Add to cart
                      </button>

                      <button onClick={() => { addToCart(selected, 1); setCartOpen(true); setSelected(null); }} className="px-4 py-2 rounded-2xl border">Buy now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart drawer */}
        <div className={`fixed top-0 right-0 h-full z-40 transition-transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="w-screen sm:w-[420px] h-full bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your cart</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setCart([])} className="text-sm text-red-600">Clear</button>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500">Your cart is empty.</div>
              ) : (
                cart.map((it) => (
                  <div key={`${it.productId}-${it.size || "_"}-${it.color || "_"}`} className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={it.image || imageUrlFromSeed(it.productId, 200)} alt={it.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{it.name}</div>
                          <div className="text-sm text-gray-500">{it.size ? `Size: ${it.size}` : null} {it.color ? ` • ${it.color}` : null}</div>
                        </div>
                        <div className="text-sm font-semibold">{formatINR(it.price * it.qty)}</div>
                      </div>

                      <div className="mt-2 flex items-center gap-3">
                        <button onClick={() => updateQty(it.productId, -1, it.size, it.color)} className="px-2 py-1 border rounded">-</button>
                        <div className="px-3 py-1 border rounded">{it.qty}</div>
                        <button onClick={() => updateQty(it.productId, +1, it.size, it.color)} className="px-2 py-1 border rounded">+</button>

                        <button onClick={() => removeFromCart(it.productId, it.size, it.color)} className="ml-3 text-sm text-red-600">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="font-semibold">{formatINR(subtotal)}</div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 rounded-2xl bg-gray-900 text-white">Checkout</button>
                <button onClick={() => setCartOpen(false)} className="px-4 py-2 rounded-2xl border">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
