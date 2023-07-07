import { useState } from 'react';

interface Product {
  id: string;
  price: string;
  thumbnail: string;
  title: string;
}

function Cart() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  console.log(products);
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setIsEmpty(false);
  };

  return (
    <div>
      {isEmpty ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        <div>
          {cart.map((product, index) => (
            <div key={ index }>
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
