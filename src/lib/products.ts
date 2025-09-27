// File: lib/products.ts
export function getProducts() {
return [
{ id: 'p1', slug: 'classic-tee', name: 'Classic Tee', price: 499, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60', description: 'Soft cotton tee' },
{ id: 'p2', slug: 'linen-shirt', name: 'Linen Shirt', price: 999, image: 'https://images.unsplash.com/photo-1520975910888-8ef2f3e42f1d?auto=format&fit=crop&w=800&q=60', description: 'Lightweight linen shirt' },
{ id: 'p3', slug: 'denim-jacket', name: 'Denim Jacket', price: 1999, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60', description: 'Timeless denim jacket' },
{ id: 'p4', slug: 'comfy-hoodie', name: 'Comfy Hoodie', price: 1299, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60', description: 'Cozy hoodie' }
];
}
export function getProductBySlug(slug: string) {
return getProducts().find(p => p.slug === slug) || null;
}