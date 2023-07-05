type Props = {
  productName: string;
  productImg: string;
  productPrice: string;
};

function CardProduct(props:Props) {
  const { productImg, productName, productPrice } = props;
  return (
    <ul>
      <li>nome</li>
      <img src="" alt="algumaImage!" />
      <li>R$ 2500</li>
    </ul>
  );
}

export default CardProduct;
