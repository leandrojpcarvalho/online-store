type Props = {
  productName: string;
  productImg: string;
  productPrice: string;
};

function CardProduct(props:Props) {
  const { productImg, productName, productPrice } = props;
  return (
    <div className="card" data-testid="product">
      <img src={ productImg } alt={ `Foto do produto ${productName}` } />
      <h3>{productName}</h3>
      <h4>{`R$ ${productPrice}`}</h4>
      <button className="button">Adicionar ao carrinho</button>
    </div>
  );
}

export default CardProduct;
