import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Layout from './pages/Layout';
import Cart from './pages/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/" element={ <Index /> } />
        <Route path="/product/:productId" element={ <ProductDetails /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
      <Route path="/cart" element={ <Cart /> } />
    </Routes>
  );
}

export default App;
