"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0)
    return <div className="min-h-screen flex items-center justify-center text-xl">Your cart is empty!</div>;

  const total = cart.reduce((acc, item) => acc + parseInt(item.price.replace("₹", "")) * item.quantity, 0);

  return (
    <div className="min-h-screen py-12 px-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-6 items-center bg-white p-4 rounded-xl shadow">
            <div className="relative w-32 h-32">
              <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-gray-600">{item.price} x {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <p className="text-2xl font-semibold mb-4">Total: ₹{total}</p>
        <button
          onClick={clearCart}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
