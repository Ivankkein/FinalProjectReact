import React, {useContext} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartWidget = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cart');}

  const getTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  
  return (
    <div className="cart-widget" onClick={handleClick}>
      <FaShoppingCart size={24} />
      <span>{getTotalItems()}</span>
    </div>
  );
};

export default CartWidget