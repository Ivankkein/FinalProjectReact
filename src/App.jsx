import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { CartProvider } from './context/CartContext';
import Checkout from './components/Checkout';






 function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path={'/'} element ={<ItemListContainer />}/>
            <Route path={'/category/:id'} element ={<ItemListContainer />}> 
            </Route>
            <Route path="/category/:categoryId/:itemId" element={<ItemDetailContainer />} />
            <Route path="/checkout" element={<Checkout />} />
            

            
      
            
      </Routes>
      </BrowserRouter>
      </CartProvider>
      <header className="App-header">
        
      </header>
    </div>
    
  );
}

export default App;
