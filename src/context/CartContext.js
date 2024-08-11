import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item, quantity) => {
    
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    } else {
      
      setCartItems([...cartItems, { ...item, quantity }]);
    }
  };

  const removeItem = (itemId) => {
    
    setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
  };

  const clear = () => {
    
    setCartItems([]);
  };

  const isInCart = (id) => {
    return cartItems.some(cartItems => cartItems.id === id);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clear, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};
