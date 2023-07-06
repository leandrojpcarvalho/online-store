import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Index /> } />
      <Route path="/product/:productId" element={ <ProductDetails /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
