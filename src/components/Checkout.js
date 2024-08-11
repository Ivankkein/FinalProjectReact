import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
    const { cartItems, clear } = useContext(CartContext);
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);
    const navigate = useNavigate(); 

    const isCartEmpty = !cartItems || cartItems.length === 0;

    useEffect(() => {
        if (purchaseCompleted) {
            
        }
    }, [purchaseCompleted]);
  
    const handleFinishPurchase = () => {
        if (isCartEmpty) {
            return;
        }
      
      clear();
      setPurchaseCompleted(true); 
    };
  
    const calculateTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    return (
      <div className="checkout">
        {purchaseCompleted ? (
          <div>
            <h1>¡Gracias por tu compra!</h1>
            <p>Tu pedido ha sido confirmado.</p>
            <p>Te hemos enviado un correo con los detalles de la compra.</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Volver a la tienda
            </button>
          </div>
        ) : (
            <div>
        <h2>Detalle de Compra</h2>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <h3>Total: ${calculateTotalPrice().toFixed(2)}</h3>
            <button onClick={handleFinishPurchase} className="btn btn-primary">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    )}
      </div>
   
    );
  };
  
  export default Checkout;