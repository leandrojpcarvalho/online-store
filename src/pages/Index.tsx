import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import { getCategories } from '../services/api';

type ProductList = {
  id: string;
  productName: string;
  productImg: string;
  productPrice: string;
};

type CategoriasProp = {
  id: string;
  name: string;
};

function Index() {
  const [productList] = useState<Array<ProductList>>([]);
  const [typedProduct, setTypedProduct] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTypedProduct(event.target.value);
  };
  const [categorias, setCategorias] = useState<Array<CategoriasProp>>();

  const ChamaGetCategories = async () => { setCategorias(await getCategories()); };

  useEffect(() => {
    ChamaGetCategories();
  }, []);

  return (
    <>
      <header>
        <h2>Online Store Ts</h2>
        <input type="text" onChange={ handleChange } />
      </header>
      <article>
        <div>
          <h3>Categorias:</h3>
          <ul>
            {categorias && categorias.map((element:CategoriasProp) => (
              <li key={ element.id } data-testid="category">
                { element.name }
              </li>))}
          </ul>
        </div>
        <div>
          {productList.length > 0 ? (
            productList.map((product) => (
              <CardProduct
                key={ product.id }
                productName={ product.productName }
                productImg={ product.productImg }
                productPrice={ product.productPrice }
              />))
          ) : (
            <h3 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h3>
          )}
        </div>
      </article>

      <Link to="/cart" data-testid="shopping-cart-button">
        <img src="./wireframes/cart.jpg" alt="carinho" />
      </Link>
    </>
  );
}

export default Index;
