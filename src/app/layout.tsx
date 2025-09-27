import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trendy Haven - Fashion Redefined",
  description: "Discover the latest fashion trends at Trendy Haven. Shop stylish, high-quality, and affordable clothing.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        

        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
