import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import ItemCount from "./ItemCount";
import { CartContext } from '../context/CartContext';

const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const { id } = useParams();
    const { addItem, isInCart, cartItems } = useContext(CartContext);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const navigate = useNavigate();
    
    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "items");
        const q = id ? query(itemsCollection, where("category", "==", id)) : itemsCollection;

        getDocs(q).then((snapshot) => {
            const fetchedItems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setItems(fetchedItems);
        });
    }, [id]);

    const handleAddToCart = (item) => {
        addItem(item, selectedQuantity);
    };

    const handleQuantityChange = (quantity) => {
        setSelectedQuantity(quantity);
    };

    const handlePurchase = () => {
        if (cartItems.length > 0) {
            navigate('/cart');
        }
    }

    return (
        <div className="container">
            <div className="row">
                {items.map(item => (
                    <div key={item.id} className="col">
                        <div className="card">
                            <Link to={`/category/${item.category}/${item.id}`}>
                                <img src={item.image} className="card-img-top" alt={item.name} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">${item.price}</p>
                                <p>{item.description}</p>
                                <ItemCount onChange={handleQuantityChange} />
                                <button 
                                    onClick={() => handleAddToCart(item)} 
                                    disabled={isInCart(item.id)}
                                >
                                    {isInCart(item.id) ? "En el carrito" : "Agregar al carrito"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {cartItems.length > 0 && (
                <div className="checkout-button-container">
                    <button 
                        onClick={handlePurchase}
                        className="btn btn-primary"
                    >
                        Terminar mi compra
                    </button>
                    
                </div>
            )}
        </div>
    );
}

export default ItemListContainer;