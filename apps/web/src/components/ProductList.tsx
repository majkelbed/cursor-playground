import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";

interface Product {
  id: string;
  title: string;
  price: number;
  img: string;
  description: string;
}

// Mock product data (in a real app, this would come from an API)
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Smartphone",
    price: 699.99,
    img: "https://placehold.co/300x200/e2e8f0/1e293b?text=Smartphone",
    description: "Latest model with high-resolution camera and long battery life."
  },
  {
    id: "2",
    title: "Laptop",
    price: 1299.99,
    img: "https://placehold.co/300x200/e2e8f0/1e293b?text=Laptop",
    description: "Powerful laptop with SSD storage and high performance."
  },
  {
    id: "3",
    title: "Headphones",
    price: 199.99,
    img: "https://placehold.co/300x200/e2e8f0/1e293b?text=Headphones",
    description: "Noise-cancelling headphones with premium sound quality."
  },
  {
    id: "4",
    title: "Smartwatch",
    price: 249.99,
    img: "https://placehold.co/300x200/e2e8f0/1e293b?text=Smartwatch",
    description: "Track your fitness and receive notifications on your wrist."
  },
  {
    id: "5",
    title: "Tablet",
    price: 499.99,
    img: "https://placehold.co/300x200/e2e8f0/1e293b?text=Tablet",
    description: "Portable tablet with high-resolution screen for work and entertainment."
  },
  {
    id: "6",
    title: "Camera",
    price: 899.99,
    img: "https://placehold.co/300x200/e2e8f0/1e293b?text=Camera",
    description: "Professional-grade camera for stunning photos and videos."
  }
];

export function ProductList() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const { addItem } = useCart();

  // In a real app, you would fetch products from an API
  useEffect(() => {
    // Simulating API call
    setProducts(mockProducts);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <img 
            src={product.img} 
            alt={product.title} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-2">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">{formatPrice(product.price)}</span>
              <button
                onClick={() => addItem(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 