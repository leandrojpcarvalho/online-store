import { useState } from 'react';

function Cart() {
  const [isEmpty, setIsEmpy] = useState(true);

  return (
    isEmpty
      ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      : null
  );
}

export default Cart;
