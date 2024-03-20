import { ProductProps } from "../generic";

export type ProductsCartProps = ProductProps & {
  quantity: number;
};

export type StateProps = {
  products: ProductsCartProps[];
  add: (product: ProductProps) => void;
  remove: (product: string) => void;
  clear: () => void;
};
