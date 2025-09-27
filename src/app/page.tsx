"use client";

import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Oversized T-Shirt",
    price: "₹799",
    image: "https://images.unsplash.com/photo-1520975922071-a6e0f7f2e6c2?w=600&q=80",
  },
  {
    id: 2,
    name: "Casual Hoodie",
    price: "₹1299",
    image: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: "₹1999",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: "₹1499",
    image: "https://images.unsplash.com/photo-1520975853988-6d77dcb270c4?w=600&q=80",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      

      {/* Hero Banner */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1514996937319-344454492b37?w=1600&q=80"
          alt="Fashion Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Elevate Your Style
          </h2>
          <p className="mb-6 text-lg md:text-xl">
            Discover the latest trends with Trendy Haven
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-8">
        <h3 className="text-3xl font-bold mb-8 text-center">New Arrivals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
            >
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-gray-600">{item.price}</p>
              <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
}
