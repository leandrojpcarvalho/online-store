export type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: string;
};

export type CartType = {
  quantity: number;
} & Product;

export type ProductDetailed = {
  id: string;
  attributes: ProductAttributes[];
  available_quantity: number;
  condition: string;
  price: string;
  pictures: Pictures[];
  title: string;
  warranty: string;
};

export type LocalStorageComments = {
  commentId: number;
  itemId: string;
  inputs: {
    input: string;
    textarea: string;
    rate: string
  }
};

export type LocalStorageTrybeComments = {
  email: string;
  text: string;
  rating: string;
};

type Pictures = {
  id: string;
  secure_url: string;
};

export type ProductAttributes = {
  id: string;
  name: string;
  value_name: string;
};

export type PropTypes = {
  handleClickLocalStorage: (productId: Product) => void;
};

export type ContextOutlet = [Product[], boolean, (e?: string) => Promise<void>];
