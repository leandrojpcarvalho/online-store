import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import { Product } from '../types';

function GetIdProduct() {
  const { productId } = useParams();
  return productId;
}

const INITIAL_STATE: Product = {
  id: '',
  price: '',
  thumbnail: '',
  title: '',
};

function ProductDetails() {
  const [product, setProduct] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const productId = GetIdProduct();
  useEffect(() => {
    const setProductState = async () => {
      if (!productId) throw new Error('novo Erro');
      const productObj = await getProductById(productId);
      setProduct(productObj);
      setIsLoading(false);
    };
    setProductState();
  }, [productId]);

  const { price, thumbnail, title } = product;
  return (
    isLoading ? (
      <h2>Carregando...</h2>
    ) : (
      <section
        className="product"
      >
        <img src={ thumbnail } alt="" data-testid="product-detail-image" />
        <div className="details">
          <h2 data-testid="product-detail-name">{ title }</h2>
          <h3 data-testid="product-detail-price">{ price }</h3>
        </div>
      </section>
    )
  );
}

export default ProductDetails;
