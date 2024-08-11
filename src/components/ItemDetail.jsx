import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import arrayProductos from '../json/productos.json';
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount';


const ItemDetail = () => {
  const { categoryId, itemId } = useParams();
  const items = arrayProductos.find(item => item.id === parseInt(itemId));
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { addItem, isInCart } = useContext(CartContext);
  const navigate = useNavigate()

  const handleAddToCart = (quantity) => {
    if (item) {
      addItem(item, quantity);
      setQuantity(quantity);
    }
  };

  const handlePurchase = () => {
    if (quantity > 0) {
      
      navigate('checkout');
      
    }
  };

  useEffect(() => {
    const fetchItem = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(arrayProductos.find(item => item.id === parseInt(itemId, 10)));
        }, 1000);
      });
    };

    fetchItem().then(data => setItem(data));
  }, [itemId]);

  if (!items) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <img src={items.image} className="card-img-top" alt={items.name} />
            <div className="card-body">
              <h5 className="card-title">{items.name}</h5>
              <p className="card-text">{items.price}</p>
              <p>{items.description}</p>
              <ItemCount/>
              <button 
                onClick={() => handleAddToCart(quantity)} 
                disabled={isInCart(items.id)}
              >
                {isInCart(items.id) ? "En el carrito" : "Comprar"}
              </button>
              {quantity > 0 && (
                <button 
                  onClick={handlePurchase}
                  className="btn btn-primary"
                >
                  Terminar mi compra
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;