import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Header from '../components/Header';
import { Product } from '../types';
import './index.css';

function Layout() {
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
<<<<<<< HEAD:src/pages/Layout.tsx
  //
  const handleClick = async (e?:string) => {
=======

  const handleClick = async (e:string) => {
>>>>>>> group2b-requisito9:src/pages/Laout.tsx
    setIsLoading(true);
    const responseArrProducts = await getProductsFromCategoryAndQuery(undefined, e);
    setProductList(responseArrProducts.results);
    setIsLoading(false);
  };

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
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
