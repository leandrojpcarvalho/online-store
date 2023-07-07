function Cart() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  console.log(products);

  return (
    products?.length === 0 || products === null
      ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        <>
          { products.map((product: any) => (
            <div key={ product.title }>
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <p>{ product.price }</p>
              <span data-testid="shopping-cart-product-quantity">1</span>
            </div>
          ))}
        </>
      )
  );
}

export default Cart;
