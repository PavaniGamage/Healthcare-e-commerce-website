import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the CartContext
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      // If the item exists, update the quantity (handle both cases of increment and initial addition)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) } // Ensure quantity defaults to 1
            : cartItem
        );
      }
      // If it's a new item, add it to the cart with the specified quantity or default to 1
      return [...prevCart, { ...item, quantity: item.quantity || 1, price: Number(item.price) || 0, _id: item.itemId }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to update quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // total item count
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate the total price of items in the cart
  const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, totalItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
