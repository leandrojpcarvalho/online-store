import { useState } from 'react';
import { Link } from 'react-router-dom';
import CardProduct from '../components/CardProduct';

type ProductList = {
  id: string;
  productName: string;
  productImg: string;
  productPrice: string;
};

function Index() {
  const [productList, setProductList] = useState<Array<ProductList>>([]);
  const [typedProduct, setTypedProduct] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTypedProduct(event.target.value);
  };

  return (
    <>
      <h2>Online Store Ts</h2>
      <input type="text" onChange={ handleChange } />
      {productList.length > 0 ? (
        productList.map((product) => (
          <CardProduct
            key={ product.id }
            productName={ product.productName }
            productImg={ product.productImg }
            productPrice={ product.productPrice }
          />))
      ) : (
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      )}
      <Link to="/cart" data-testid="shopping-cart-button">
        <img src="./wireframes/cart.jpg" alt="carinho" />
      </Link>
    </>
  );
}

export default Index;
