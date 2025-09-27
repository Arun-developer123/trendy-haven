"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

// Sample product data (future me DB se connect karna hoga)
const products = [
  {
    id: 1,
    name: "Oversized T-Shirt",
    price: "₹799",
    image: "/images/product1.jpg",
    description:
      "High-quality cotton oversized t-shirt, comfortable fit and perfect for casual wear.",
  },
  {
    id: 2,
    name: "Casual Hoodie",
    price: "₹1299",
    image: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80",
    description:
      "Cozy fleece-lined hoodie designed for everyday comfort and streetwear style.",
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: "₹1999",
    image: "/images/product3.jpg",
    description:
      "Timeless denim jacket with a modern fit. A must-have wardrobe essential.",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: "₹1499",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
    description:
      "Lightweight and stylish summer dress perfect for outings and beachwear.",
  },
  {
    id: 5,
    name: "Formal Shirt",
    price: "₹999",
    image: "/images/product5.jpg",
    description:
      "Premium cotton formal shirt designed for office wear and special occasions.",
  },
  {
    id: 6,
    name: "Slim Fit Jeans",
    price: "₹1599",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    description:
      "Stretchable slim-fit jeans for a modern and stylish look.",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params?.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Product not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-8 flex flex-col md:flex-row gap-12">
      {/* Left - Product Image */}
      <div className="relative w-full md:w-1/2 h-[500px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Right - Product Info */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-gray-800 mb-4">{product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
