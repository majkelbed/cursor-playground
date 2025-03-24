import { useState, useEffect } from "react";
import { formatPrice } from "../lib/utils";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
  total: number;
  items: OrderItem[];
}

// Mock order data (in a real app, this would come from an API)
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2023-11-10",
    status: "Delivered",
    total: 899.98,
    items: [
      { id: "1", title: "Smartphone", price: 699.99, quantity: 1 },
      { id: "3", title: "Headphones", price: 199.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-002",
    date: "2023-11-05",
    status: "Processing",
    total: 1299.99,
    items: [
      { id: "2", title: "Laptop", price: 1299.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-003",
    date: "2023-10-28",
    status: "Delivered",
    total: 949.97,
    items: [
      { id: "4", title: "Smartwatch", price: 249.99, quantity: 1 },
      { id: "5", title: "Tablet", price: 499.99, quantity: 1 },
      { id: "3", title: "Headphones", price: 199.99, quantity: 1 }
    ]
  }
];

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // In a real app, you would fetch orders from an API
  useEffect(() => {
    // Simulating API call
    setOrders(mockOrders);
  }, []);

  // Format date to a more readable format
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const getStatusColor = (status: Order['status']): string => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-between border-b">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="font-medium">{formatDate(order.date)}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="mt-3 sm:mt-0">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">{formatPrice(order.total)}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  className="mt-3 sm:mt-0 px-4 py-2 text-sm border rounded-md hover:bg-gray-50 transition-colors"
                >
                  {selectedOrder === order.id ? "Hide Details" : "View Details"}
                </button>
              </div>
              
              {selectedOrder === order.id && (
                <div className="p-4">
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="divide-y">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="py-3 flex justify-between">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 