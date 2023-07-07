import { useEffect, useState } from 'react';

interface Product {
  id: string;
  price: string;
  thumbnail: string;
  title: string;
}

function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(products);
  }, []);

  return (
    <div>
      {cart.length === 0 || cart === null ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={ product.id }>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p>
                Price:
                {' '}
                {product.price}
              </p>
              <span data-testid="shopping-cart-product-quantity">1</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
