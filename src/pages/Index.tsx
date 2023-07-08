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
          productPrice={ price }
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
      <footer>
        <p>© 2023 Projeto desenvolvido por:</p>
        <div className="pessoasMain">
          <div className="PessoasChild">
            <img className="PessoaImg" src="" alt="Anna" />
            <a href="www.linkedin.com/in/mathban">Anna Escolaro</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="" alt="Brenda" />
            <a href="www.linkedin.com/in/mathban">Brenda Reis</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="" alt="Felipe" />
            <a href="www.linkedin.com/in/mathban">Felipe Vergara</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="" alt="Leandro" />
            <a href="www.linkedin.com/in/mathban">Leandro José</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="" alt="Luiz" />
            <a href="www.linkedin.com/in/mathban">Luiz Henrique</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="https://media.licdn.com/dms/image/D4D03AQF1I4zoR6tfNA/profile-displayphoto-shrink_800_800/0/1684491624580?e=1694044800&v=beta&t=tfRyOAtDhalyVPIVdX0RsRPzlN2Rc0AEd1jFHnFeE3k" alt="Matheus" />
            <a href="www.linkedin.com/in/mathban">Matheus Bandeira</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
