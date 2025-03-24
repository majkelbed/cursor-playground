import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";

export function ShoppingCart() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart ({totalItems} items)</h2>
      
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center border-b pb-4">
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center border rounded-l-md"
              >
                -
              </button>
              <span className="w-10 text-center border-t border-b">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border rounded-r-md"
              >
                +
              </button>
            </div>
            <div className="ml-6 text-right">
              <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span>Subtotal:</span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Shipping:</span>
          <span className="font-medium">{formatPrice(totalPrice > 0 ? 10 : 0)}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold mb-6">
          <span>Total:</span>
          <span>{formatPrice(totalPrice + (totalPrice > 0 ? 10 : 0))}</span>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert("Checkout functionality would go here!")}
            className="flex-grow px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 