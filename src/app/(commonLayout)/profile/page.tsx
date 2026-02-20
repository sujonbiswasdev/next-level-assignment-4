"use client";

import { useState } from "react";

// Food items
const foodItems = [
  { id: 1, name: "Burger", price: 5.99, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Pizza", price: 8.99, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Pasta", price: 7.49, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Salad", price: 4.99, image: "https://via.placeholder.com/150" },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add to cart
  const addToCart = (item: any) => {
    const exists = cart.find(i => i.id === item.id);
    if (exists) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id: number) => {
    setCart(cart.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decreaseQuantity = (id: number) => {
    setCart(cart.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0));
  };

  const removeItem = (id: number) => setCart(cart.filter(i => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Simulated checkout
  const checkout = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    alert(`Payment Successful! Total: $${total.toFixed(2)}`);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">FoodHub</h1>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodItems.map(item => (
          <div key={item.id} className="border rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition">
            <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded" />
            <h2 className="text-lg font-bold mt-2">{item.name}</h2>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow-lg"
      >
        Cart ({cart.length})
      </button>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty.</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button onClick={() => decreaseQuantity(item.id)} className="px-2 bg-gray-200 rounded">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="px-2 bg-gray-200 rounded">+</button>
                        <button onClick={() => removeItem(item.id)} className="ml-2 text-red-500">Remove</button>
                      </div>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <div className="border-t pt-3 mt-3 flex justify-between items-center">
                  <span className="font-bold">Total: ${total.toFixed(2)}</span>
                  <button
                    onClick={checkout}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}

            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}