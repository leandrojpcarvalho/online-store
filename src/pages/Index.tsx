import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import './index.css';
import Header from '../components/Header';
import { Product } from '../types';

type CategoriasProp = {
  id: string;
  name: string;
};

function Index() {
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [categorias, setCategorias] = useState<Array<CategoriasProp>>();
  //
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    setIsLoading(true);
    const responseArrProducts = await getProductsFromCategoryAndQuery(undefined, input);
    setProductList(responseArrProducts.results);
    setIsLoading(false);
  };

  const ChamaGetCategories = async () => { setCategorias(await getCategories()); };

  useEffect(() => {
    ChamaGetCategories();
  }, []);

  const contentProductList = productList.length > 0 ? (
    productList.map((product) => {
      const { id, price, thumbnail, title } = product;
      return (
        <CardProduct
          key={ id }
          id={ id }
          productName={ title }
          productImg={ thumbnail }
          productPrice={ price }
        />
      );
    })
  ) : (
    <h3 data-testid="home-initial-message">
      Digite algum termo de pesquisa ou escolha uma categoria.
    </h3>
  );

  return (
    <div className="main">
      <Header
        handleClick={ handleClick }
        handleOnChange={ handleOnChange }
        inputValue={ input }
      />
      <article>
        <div className="container">
          <h3>Categorias:</h3>
          <ul>
            {categorias && categorias.map((element:CategoriasProp) => (
              <li key={ element.id } data-testid="category">
                { element.name }
              </li>))}
          </ul>
        </div>
        <div className="grid">
          {isLoading ? (<h3> carregando...</h3>) : (contentProductList)}
        </div>
      </article>

      <Link to="/cart" data-testid="shopping-cart-button">
        <img src="./wireframes/cart.jpg" alt="carinho" />
      </Link>
    </div>
  );
}

export default Index;
