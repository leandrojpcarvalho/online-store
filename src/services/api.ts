export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await categories.json();
  console.log(response);
  return response;
}

export async function
getProductsFromCategoryAndQuery(categoryId?: string, query?: string) {
  const id = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=$${categoryId}&q=$${query}`);
  const responseId = await id.json();
  return responseId;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
