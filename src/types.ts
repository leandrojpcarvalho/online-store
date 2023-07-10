export type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
};

export type PropTypes = {
  handleClickLocalStorage: (product: Product) => void;
};

export type ContextOutlet = [Product[], boolean, (e?: string) => Promise<void>];
