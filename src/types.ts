export type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: string;
};

export type PropTypes = {
  handleClickLocalStorage: (product: Product) => void;
};

export type ContextOutlet = [Product[], boolean, (e?: string) => Promise<void>];
