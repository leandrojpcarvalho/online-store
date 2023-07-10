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
      <footer>
        <p>© 2023 Projeto desenvolvido por:</p>
        <div className="pessoasMain">
          <div className="PessoasChild">
            <img className="PessoaImg" src="https://media.licdn.com/dms/image/D4E03AQH4Vq0ZmmwXJQ/profile-displayphoto-shrink_200_200/0/1686765635961?e=1694044800&v=beta&t=fbNlQnOWS_lAYcIqAEiHASUg_qW0oFKFSz5_E2X6vSo" alt="Anna" />
            <a href="www.linkedin.com/in/mathban">Anna Escolaro</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="https://media.licdn.com/dms/image/C4D03AQGz7z1E0NLaOQ/profile-displayphoto-shrink_100_100/0/1657910942363?e=1694044800&v=beta&t=OxfGhKwfq1RUMvuFzVoE6jY9Nng6mQXbWB6sYdBhfpE" alt="Brenda" />
            <a href="www.linkedin.com/in/mathban">Brenda Reis</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="https://media.licdn.com/dms/image/D4E03AQEOfSMcVPUqwA/profile-displayphoto-shrink_100_100/0/1679633498365?e=1694044800&v=beta&t=lSjJQuJGyRnrp2G-yeNvlvLIGTqvPYJv4j2o0uI5adY" alt="Felipe" />
            <a href="www.linkedin.com/in/mathban">Felipe Vergara</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="https://media.licdn.com/dms/image/D4E35AQHibJlh-cwfKg/profile-framedphoto-shrink_200_200/0/1680046031006?e=1689397200&v=beta&t=zy4GvI16KRjlWdU_1xZwgz5y8fOdsonH7pepTrgyBSQ" alt="Leandro" />
            <a href="www.linkedin.com/in/mathban">Leandro Carvalho</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="https://media.licdn.com/dms/image/D4D03AQGlRZAsINzahg/profile-displayphoto-shrink_100_100/0/1680542139861?e=1694044800&v=beta&t=WttdjAnykM-K5451o3svs-TNKwuIP_VUw6HYO-4zuik" alt="Luiz" />
            <a href="www.linkedin.com/in/mathban">Luiz Henrique</a>
          </div>
          <div className="PessoasChild">
            <img className="PessoaImg" src="https://media.licdn.com/dms/image/D4D03AQF1I4zoR6tfNA/profile-displayphoto-shrink_800_800/0/1684491624580?e=1694044800&v=beta&t=tfRyOAtDhalyVPIVdX0RsRPzlN2Rc0AEd1jFHnFeE3k" alt="Matheus" />
            <a href="www.linkedin.com/in/mathban">Matheus Bandeira</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
