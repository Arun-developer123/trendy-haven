// File: components/ProductCard.tsx
import Link from "next/link";


export default function ProductCard({ product }: any) {
return (
<article className="border rounded p-4 hover:shadow">
<Link href={`/product/${product.slug}`}>
<img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded" />
<h3 className="mt-3 font-semibold">{product.name}</h3>
<div className="mt-2 text-gray-600">₹{product.price}</div>
</Link>
</article>
);
}