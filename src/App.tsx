import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Layout from './pages/Layout';
import Cart from './pages/Cart';
import { CartType, Product } from './types';

function App() {
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(products);
  }, []);

  const updateLocalStorageQuantity = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  useEffect(() => {
    updateLocalStorageQuantity();
  }, [cart]);

  const addToCart = (product: Product) => {
    const hasObject = cart.find((cartProduct) => cartProduct.id === product.id);
    let cartToUpdate;
    if (!hasObject) {
      cartToUpdate = [...cart, { ...product, quantity: 1 }];
    } else {
      const cartWithoutProdToIncrement = cart.filter((items) => items.id !== product.id);
      cartToUpdate = [...cartWithoutProdToIncrement,
        { ...hasObject, quantity: hasObject.quantity += 1 }];
    }
    localStorage.setItem('cart', JSON.stringify(cartToUpdate));
    setCart(cartToUpdate);
  };
  return (
    <Routes>
      <Route path="/" element={ <Layout cart={ cart } /> }>
        <Route path="/" element={ <Index handleClickLocalStorage={ addToCart } /> } />
        <Route
          path="/product/:productId"
          element={ <ProductDetails handleClickLocalStorage={ addToCart } /> }
        />
        <Route path="*" element={ <NotFound /> } />
        <Route path="/cart" element={ <Cart cart={ cart } setCart={ setCart } /> } />
      </Route>
    </Routes>
  );
}

export default App;
