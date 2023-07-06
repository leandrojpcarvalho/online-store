import { useEffect, useState } from 'react';
import CardProduct from '../components/CardProduct';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import './index.css';

type ProductList = {
  id: string;
  title: string;
  thumbnail: string;
  price: string;
};

type CategoriasProp = {
  id: string;
  name: string;
};

function Index() {
  const [productList, setProductList] = useState<Array<ProductList>>([]);
  const [input, setInput] = useState<string>('');
  const [categorias, setCategorias] = useState<Array<CategoriasProp>>();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleclick = async (e:string) => {
    const responseArrProducts = await getProductsFromCategoryAndQuery(undefined, e);
    setProductList(responseArrProducts.results);
  };

  const categoriesChange = async (e:string) => {
    handleclick(e);
  };

  const ChamaGetCategories = async () => { setCategorias(await getCategories()); };

  useEffect(() => {
    ChamaGetCategories();
  }, []);

  return (
    <div className="main">
      <header>
        <div className="container row">
          <input
            type="text"
            data-testid="query-input"
            onChange={ handleOnChange }
            value={ input }
          />
          <button
            data-testid="query-button"
            onClick={ () => handleclick(input) }
            className="search"
            aria-label="Search"
          >
            <img src="../src/assets/img/search.svg" alt="asfesds" />
          </button>
        </div>
        <img src="../src/assets/img/logo.svg" alt="" />
        <img src="../src/assets/img/cart.svg" alt="" />
      </header>
      <article>
        <div className="container list">
          <h3>Categorias:</h3>
          <ul>
            {categorias && categorias.map((element:CategoriasProp) => (
              <button
                className="ulButton"
                key={ element.id }
                data-testid="category"
                onClick={ () => categoriesChange(element.name) }
              >
                { element.name }
              </button>))}
          </ul>
        </div>
        <div className="grid">
          {productList.length > 0 ? (
            productList.map((product) => {
              const { id, price, thumbnail, title } = product;
              return (
                <CardProduct
                  key={ id }
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
          )}
        </div>
      </article>
    </div>
  );
}

export default Index;
