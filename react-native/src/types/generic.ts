import { PRODUCTS } from "@/utils/data/products";
import { ImageProps } from "react-native";

export type ProductProps = (typeof PRODUCTS)[0];

export type ProductDataType = {
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
};
