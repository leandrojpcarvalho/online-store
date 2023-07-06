import { useState } from 'react';

function Cart() {
  const [isEmpty, setIsEmpty] = useState(true);

  return (
    isEmpty
      ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      : <p>oi</p>
  );
}

export default Cart;
