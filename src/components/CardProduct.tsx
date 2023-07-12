import { useNavigate } from 'react-router-dom';
import { insertSvgFreeShipping } from '../utils/functions';
import { Product } from '../types';

type Props = {
  handleOnClick: (param: any) => void;
  objProduct: Product;
};

function CardProduct(props:Props) {
  const { handleOnClick, objProduct } = props;
  const { id, price,
    thumbnail, title, shipping: { free_shipping: freeShipping } } = objProduct;
  const navigator = useNavigate();
  const handleGoToProductDetails = () => {
    navigator(`/product/${id}`);
  };
  return (
    <div className="card" data-testid="product">
      <div
        onClick={ handleGoToProductDetails }
        aria-hidden="true"
        data-testid="product-detail-link"
      >
        {insertSvgFreeShipping(freeShipping)}
        <img src={ thumbnail } alt={ `Foto do produto ${title}` } />
        <h3>{title}</h3>
        <h4>{`R$ ${price}`}</h4>
      </div>
      <button
        className="button"
        data-testid="product-add-to-cart"
        onClick={ () => handleOnClick(objProduct) }
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}

export default CardProduct;
