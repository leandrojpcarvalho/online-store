export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await categories.json();
  return response;
}

export async function
getProductsFromCategoryAndQuery(categoryId?: string, query?: string) {
  const id = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=$${categoryId}&q=$${query}`);
  const responseId = await id.json();
  return responseId;
}

export async function getProductById(productId: string) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const productObj = await response.json();
  return productObj;
}
