import { useNavigate } from 'react-router-dom';

type Props = {
  id: string
  productName: string;
  productImg: string;
  productPrice: string;
  handleOnClick: (param: any) => void;
  objProduct: object;
};

function CardProduct(props:Props) {
  const { id, productImg, productName, productPrice, handleOnClick, objProduct } = props;
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
        <img src={ productImg } alt={ `Foto do produto ${productName}` } />
        <h3>{productName}</h3>
        <h4>{`R$ ${productPrice}`}</h4>
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
