import { useEffect, useState } from "react";
import arrayProductos from "../json/productos.json"
import { useParams, Link } from "react-router-dom";
import ItemDetail from './ItemDetail';


const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const { categoryId, itemId } = useParams();
  
    useEffect(() => {
        const getProduct = new Promise((resolve, reject) => {
            const product = arrayProductos.find(p => p.id === parseInt(itemId));
            setTimeout(() => resolve(product), 1000);
        });

        getProduct.then(result => {
          setItem(result);
        });
      }, [itemId]);
    
      return (
        <div>
          {item ? <ItemDetail item={item} /> : <p>Loading...</p>}

        </div>
      );
    };
    
    export default ItemDetailContainer;