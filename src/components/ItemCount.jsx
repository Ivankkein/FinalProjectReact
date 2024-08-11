 import React, { useState } from 'react';


const ItemCount = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);
  

  const handleIncrement = () => setQuantity(quantity + 1); onChange(quantity + 1);
  const handleDecrement = () => {const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    onChange(newQuantity);
  };
  
  


  return (
    <div>
      <h6>Quantity</h6>
      <button onClick={handleDecrement}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrement}>+</button>
      
    </div>
              
  );
};

export default ItemCount;

