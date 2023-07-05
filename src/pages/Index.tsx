import { useState } from 'react';
import CardProduct from '../components/CardProduct';

type ProductList = {
  id: string;
  productName: string;
  productImg: string;
  productPrice: string;
};

function Index() {
  const [productList, setProductList] = useState<Array<ProductList>>([]);

  return (
    <>
      <h2>Online Store Ts</h2>
      <input type="text" />
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
    </>
  );
}

export default Index;
