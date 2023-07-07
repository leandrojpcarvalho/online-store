import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import { getCategories } from '../services/api';
import { ContextOutlet, PropTypes } from '../types';
import './index.css';

type CategoriasProp = {
  id: string;
  name: string;
};

function Index({ handleClickLocalStorage }: PropTypes) {
  const [productList, isLoading, handleClick]: ContextOutlet = useOutletContext();
  const [categorias, setCategorias] = useState<Array<CategoriasProp>>();

  const categoriesChange = (e:string) => {
    handleClick(e);
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
          objProduct={ product }
          handleOnClick={ handleClickLocalStorage }
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
      <article>
        <div className="container list">
          <h3>Categorias:</h3>
          <hr />
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
          {isLoading ? (<h3> carregando...</h3>) : (contentProductList)}
        </div>
      </article>
    </div>
  );
}

export default Index;
