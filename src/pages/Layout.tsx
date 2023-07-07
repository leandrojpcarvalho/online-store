import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Header from '../components/Header';
import { ContextOutlet, Product } from '../types';
import './index.css';

Outlet.prototype as ContextOutlet;

function Layout() {
  const [input, setInput] = useState<string>('');
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async (e?:string) => {
    setIsLoading(true);
    const search = !e ? input : e;
    const responseArrProducts = await getProductsFromCategoryAndQuery(undefined, search);
    setProductList(responseArrProducts.results);
    setIsLoading(false);
  };

  useEffect(() => {
    localStorage.setItem('products', '[]');
  }, []);

  return (
    <>
      <div>
        <Header
          handleClick={ handleClick }
          handleOnChange={ handleOnChange }
          inputValue={ input }
        />
      </div>
      <main>
        <Outlet context={ [productList, isLoading, handleClick] } />
      </main>
    </>
  );
}

export default Layout;
