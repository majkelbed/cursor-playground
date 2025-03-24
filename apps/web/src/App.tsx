import { useState } from 'react';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';
import { OrdersPage } from './components/OrdersPage';
import { CartProvider } from './context/CartContext';

function App() {
  const [activePage, setActivePage] = useState<'products' | 'cart' | 'orders'>('products');

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-bold text-gray-900">E-Commerce Store</h1>
              <nav className="flex space-x-4">
                <button 
                  onClick={() => setActivePage('products')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'products' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Products
                </button>
                <button 
                  onClick={() => setActivePage('cart')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'cart' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cart
                </button>
                <button 
                  onClick={() => setActivePage('orders')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'orders' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Orders
                </button>
              </nav>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activePage === 'products' && <ProductList />}
          {activePage === 'cart' && <ShoppingCart />}
          {activePage === 'orders' && <OrdersPage />}
        </main>
      </div>
    </CartProvider>
  );
}

export default App; 