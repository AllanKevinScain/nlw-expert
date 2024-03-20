import { TouchableOpacity } from "react-native";
import { ButtonInterface } from "@/types";

export function Button(props: ButtonInterface) {
  const { children, ...rest } = props;

  return (
    <TouchableOpacity
      {...rest}
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}
