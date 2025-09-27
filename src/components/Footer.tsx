export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Trendy Haven. All rights reserved.
      </p>
      <div className="flex justify-center gap-6 mt-3 text-sm">
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
        <a href="/shop" className="hover:underline">
          Shop
        </a>
      </div>
    </footer>
  );
}
