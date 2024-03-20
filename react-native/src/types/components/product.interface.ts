import { TouchableOpacityProps } from "react-native";
import { ProductDataType } from "@/types";

export interface ProductInterface extends TouchableOpacityProps {
  data: ProductDataType;
}
