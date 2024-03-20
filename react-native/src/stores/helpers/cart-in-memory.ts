import { ProductProps, ProductsCartProps } from "@/types";

export function add(products: ProductsCartProps[], newProduct: ProductProps) {
  const existingProducts = products.find((i) => newProduct.id === i.id);

  if (existingProducts) {
    return products.map((p) => {
      const isEqual = p.id === existingProducts.id;

      return isEqual ? { ...p, quantity: p.quantity + 1 } : p;
    });
  }

  return [...products, { ...newProduct, quantity: 1 }];
}

export function remove(products: ProductsCartProps[], productRemoveId: string) {
  const updateProducts = products.map((p) => {
    const isSelectedProduct = p.id === productRemoveId;

    if (isSelectedProduct) {
      const hasQuantity = p.quantity > 1;

      return {
        ...p,
        quantity: hasQuantity ? p.quantity - 1 : 0,
      };
    }

    return p;
  });

  return updateProducts.filter((f) => f.quantity > 0);
}
