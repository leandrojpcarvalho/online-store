import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

function Cart() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(products);
  }, []);

  const handleUpdateCart = (productId: string, quantity: number) => {
    if (quantity > 0) {
      const updatedCart = cart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity };
        }
        return product;
      });
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="cartPage">
      <div className="cart-box">
        <h1>Carrinho de Compras</h1>
        <hr />
        {cart.length === 0 || cart === null ? (
          <div className="cartPageVazio">
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            <img src="src/fantasma.png" alt="" />
            <Link
              className="voltarbtn"
              onClick={ () => window.history.back() }
              to="/"
            >
              voltar às compras
            </Link>
          </div>
        ) : (
          <div>
            {cart.map((product) => (
              <>
                <div key={ product.id } className="cart-product">
                  <button
                    type="button"
                    className="cart-item-button"
                    data-testid="remove-product"
                    onClick={ () => handleRemoveProduct(product.id) }
                  >
                    <img src="../src/assets/img/cart_remove.svg" alt="remove produto" />
                  </button>
                  <img src={ product.thumbnail } alt="imagem do produto" />
                  <p data-testid="shopping-cart-product-name">{product.title}</p>
                  <p>
                    R$
                    {' '}
                    {product.price}
                  </p>
                  <button
                    type="button"
                    className="cart-item-button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => handleUpdateCart(product.id, product.quantity - 1) }
                  >
                    <img
                      src="../src/assets/img/cart_decrease.svg"
                      alt="diminuir quantidade"
                    />
                  </button>
                  <span
                    data-testid="shopping-cart-product-quantity"
                  >
                    {product.quantity}
                  </span>
                  <button
                    type="button"
                    className="cart-item-button"
                    data-testid="product-increase-quantity"
                    onClick={ () => handleUpdateCart(product.id, product.quantity + 1) }
                  >
                    <img
                      src="../src/assets/img/cart_increase.svg"
                      alt="aumentar quantidade"
                    />
                  </button>
                </div>
                <hr />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
