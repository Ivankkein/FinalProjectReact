import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { db } from '../main';

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { addItem, isInCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (quantity) => {
    if (item) {
      addItem(item, quantity);
      setQuantity(quantity);
    }
  };

  const handlePurchase = () => {
    if (quantity > 0) {
      navigate('/cart');
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      const db = getFirestore();
      const docRef = doc(db, "items", itemId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() });
      } else {
        setItem(null);
      }
    };

    fetchItem();
  }, [itemId]);

  if (!item) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <img src={item.image} className="card-img-top" alt={item.name} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">${item.price}</p>
              <p>{item.description}</p>
              <ItemCount onChange={setQuantity} />
              <button 
                onClick={() => handleAddToCart(quantity)} 
                disabled={isInCart(item.id)}
              >
                {isInCart(item.id) ? "En el carrito" : "Comprar"}
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