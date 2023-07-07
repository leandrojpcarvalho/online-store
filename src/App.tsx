import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Layout from './pages/Layout';
import Cart from './pages/Cart';
import { Product } from './types';

function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const addToCart = (product: Product) => {
    if (!cart.includes(product)) {
      const addProduct = [...cart, product];
      localStorage.setItem('cart', JSON.stringify(addProduct));
      setCart(addProduct);
    }
  };
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/" element={ <Index handleClickLocalStorage={ addToCart } /> } />
        <Route
          path="/product/:productId"
          element={ <ProductDetails handleClickLocalStorage={ addToCart } /> }
        />
        <Route path="*" element={ <NotFound /> } />
      </Route>
      <Route path="/cart" element={ <Cart /> } />
    </Routes>
  );
}

export default App;
