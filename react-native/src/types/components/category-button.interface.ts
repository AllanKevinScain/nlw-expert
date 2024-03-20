import { PressableProps } from "react-native";

export interface CategoryButtonInterface extends PressableProps {
  title: string;
  isSeleted?: boolean;
}
