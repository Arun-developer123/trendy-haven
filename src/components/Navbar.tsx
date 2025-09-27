"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-wide">
        Trendy Haven
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium">
        <li>
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/shop" className="hover:text-gray-600">
            Shop
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-gray-600">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-600">
            Contact
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-40">
          <ul className="flex flex-col gap-3 font-medium">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={() => setIsOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
