"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">Trendy Haven</h2>
          <p className="mt-3 text-sm text-gray-400">
            Your ultimate destination for trendy & affordable fashion. 
            Stay stylish with the latest collections curated just for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white">Customer Service</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/returns" className="hover:text-white">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter + Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
          <p className="mt-3 text-sm text-gray-400">
            Subscribe to our newsletter and get the latest trends delivered to your inbox.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-r-md text-white font-semibold"
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5">
            <Link href="#" className="hover:text-pink-500">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-pink-500">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-pink-500">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-pink-500">
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Trendy Haven. All rights reserved.
      </div>
    </footer>
  );
}
