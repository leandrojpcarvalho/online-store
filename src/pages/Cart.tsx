import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartType } from '../types';

type CartPropType = {
  cart: CartType[];
  setCart: (cart: CartType[]) => void,
};

function Cart(props: CartPropType) {
  const { cart, setCart } = props;

  const handleUpdateCart = (productId: string, quantity: number) => {
    const hasProduct = cart.find((cartItem) => cartItem.id === productId) ?? cart[0];
    if (quantity > 0 && quantity <= hasProduct.available_quantity) {
      const updatedCart = cart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity };
        }
        return product;
      });
      setCart(updatedCart);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className="cartPage">
      <div className="cart-box">
        <h1>Carrinho de Compras</h1>
        <hr />
        {cart.length === 0 || cart === null ? (
          <div className="cartPageVazio">
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            <img src="images/fantasma.png" alt="" />
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
              <div key={ product.id }>
                <div className="cart-product">
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
              </div>
            ))}
            <div className="bntCart2">
              <Link
                className="voltarbtn"
                onClick={ () => window.history.back() }
                to="/"
              >
                continuar comprando
              </Link>
              <Link
                className="voltarbtn finalizarbtn"
                onClick={ () => window.history.back() }
                to="/"
              >
                finalizar compra
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
