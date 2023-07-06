import { useNavigate } from 'react-router-dom';

type Props = {
  id: string
  productName: string;
  productImg: string;
  productPrice: string;
};

function CardProduct(props:Props) {
  const { id, productImg, productName, productPrice } = props;
  const navigator = useNavigate();
  const handleGoToProductDetails = () => {
    navigator(`/product/${id}`);
  };
  return (
    <div className="card" data-testid="product">
      <div onClick={ handleGoToProductDetails } aria-hidden="true">
        <img src={ productImg } alt={ `Foto do produto ${productName}` } />
        <h3>{productName}</h3>
        <h4>{`R$ ${productPrice}`}</h4>
      </div>
      <button className="button">Adicionar ao carrinho</button>
    </div>
  );
}

export default CardProduct;
