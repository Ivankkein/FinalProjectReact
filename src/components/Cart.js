import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeItem, clear } = useContext(CartContext);
    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="cart-container">
            <h2>Tu Carrito</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.name} width="50" />
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Precio: ${item.price.toFixed(2)}</p>
                                    <button onClick={() => removeItem(item.id)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${calculateTotalPrice().toFixed(2)}</h3>
                    <button onClick={clear} className="btn-clear">Vaciar Carrito</button>
                    <button onClick={handleCheckout} className="btn-checkout">Ir a Pagar</button>
                </>
            )}
        </div>
    );
};

export default Cart;