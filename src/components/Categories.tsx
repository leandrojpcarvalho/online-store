import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

type CategoriasProp = {
  id: string;
  name: string;
};

type CategoriesProps = {
  handleClick: (e?: string) => Promise<void>
};

function Categories({ handleClick }: CategoriesProps) {
  const [categorias, setCategorias] = useState<Array<CategoriasProp>>();

  const categoriesChange = (e:string) => {
    handleClick(e);
  };

  const ChamaGetCategories = async () => { setCategorias(await getCategories()); };

  useEffect(() => {
    ChamaGetCategories();
  }, []);

  return (
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

  );
}

export default Categories;
