import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from './ItemDetail';
import {doc, getDoc, getFirestore} from "firebase/firestore"



    const ItemDetailContainer = () => {
      const [item, setItem] = useState(null);
      const { itemId } = useParams();
  
      useEffect(() => {
          const db = getFirestore();
          const docRef = doc(db, "items", itemId); 
  
          getDoc(docRef).then((snapshot) => {
              if (snapshot.exists()) {
                  setItem({ id: snapshot.id, ...snapshot.data() });
              }  else {
                setItem("producto no existe");
            }
              
          }).catch(() => {
            setItem("Error")
          });
      }, [itemId]);
  
      return (
          <div>
              {item ? <ItemDetail item={item} /> : <p>Loading...</p>}
          </div>
      );
  };
  
    
  export default ItemDetailContainer;