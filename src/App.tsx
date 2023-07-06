import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Index from './pages/Index';
import Cart from './pages/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Index /> } />
      <Route path="/cart" element={ <Cart /> } />
    </Routes>
  );
}

export default App;
