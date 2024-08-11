import { useEffect, useState, useContext } from "react";
import arrayProductos from "../json/productos.json"
import { useParams, Link, useNavigate } from "react-router-dom";
import ItemCount from "./ItemCount";
import { CartContext } from '../context/CartContext';

const ItemListContainer = () => {
    const [item, setItem] = useState(arrayProductos);
    const { id } = useParams();
    const { addItem, isInCart, cartItems } = useContext(CartContext);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const navigate = useNavigate();
    

    useEffect(() => {
        setItem(id ? arrayProductos.filter(item => item.category == id) : arrayProductos)
    }, [id]);

    const handleAddToCart = (item) => {
        addItem(item, selectedQuantity);
    };

    const handleQuantityChange = (quantity) => {
        setSelectedQuantity(quantity);
    };

    
    

    const handlePurchase = () => {
        if (cartItems.length > 0) { navigate('checkout');
        }
    }

    return (
        <div className="container">
            <div key={item.id} className="row">
                {item.map(item => (
                    <div className="col">
                        <div class="card">
                        <Link to={`/category/${item.category}/${item.id}`}>
                            <img src={item.image} class="card-img-top" alt={item.name} />
                            </Link>
                            <div class="card-body">
                                <h5 class="card-title">{item.name}</h5>
                                <p class="card-text">{item.price}</p>
                                <p>{item.description}</p>
                                <ItemCount onChange={handleQuantityChange} />
                                {<button 
                                    onClick={() => handleAddToCart(item)} 
                                    disabled={isInCart(item.id)}
                                >
                                    {isInCart(item.id) ? "En el carrito" : "Agregar al carrito"}
                                </button>}
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
        </div>)}

export default ItemListContainer