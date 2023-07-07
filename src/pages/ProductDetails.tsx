import { useParams, Link } from 'react-router-dom';
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
  const { price, thumbnail, title } = product;

  useEffect(() => {
    const setProductState = async () => {
      if (!productId) throw new Error('novo Erro');
      const productObj = await getProductById(productId);
      setProduct(productObj);
      setIsLoading(false);
    };
    setProductState();
  }, [productId]);

  const handleClick = () => {
    const products = localStorage.getItem('products');
    if (products === null) {
      localStorage.setItem('products', JSON.stringify([
        { title: product.title, price: product.price }]));
    } else {
      const products2 = JSON.parse(products);
      products2.push({ title: product.title, price: product.price });
      localStorage.setItem('products', JSON.stringify(products2));
    }
  };

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
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ handleClick }
        >
          Adicionar ao carrinho
        </button>
        <Link to="/cart">
          <button data-testid="shopping-cart-button">Ir para o carrinho</button>
        </Link>
      </section>
    )
  );
}

export default ProductDetails;
