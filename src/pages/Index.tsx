import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import { getCategories } from '../services/api';
import { ContextOutlet, PropTypes } from '../types';
// import './dark.css';
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
    <div className="grid">
      {
    productList.map((product) => {
      const { id, price, thumbnail, title } = product;
      return (
        <CardProduct
          key={ id }
          id={ id }
          productName={ title }
          productImg={ thumbnail }
          productPrice={ price.toString() }
          objProduct={ product }
          handleOnClick={ handleClickLocalStorage }
        />
      );
    })
}
    </div>
  ) : (
    <div className="Informacoes">
      <h3 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h3>
    </div>
  );

  return (
    <div className="main">
      <article>
        <div className="container list">
          <h2 className="h2list">Categorias:</h2>
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

        {isLoading ? (
          <div className="Informacoes carregando">
            <img src="https://www.blogson.com.br/wp-content/uploads/2017/10/loading-gif-transparent-10.gif" alt="loading" />
            <h3> carregando</h3>
          </div>) : (contentProductList)}
      </article>
    </div>
  );
}

export default Index;
