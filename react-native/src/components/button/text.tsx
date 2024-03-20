import { Text } from "react-native";
import { ButtonTextInterface } from "@/types";

export function ButtonText(props: ButtonTextInterface) {
  const { children } = props;

  return (
    <Text className="text-base text-black font-heading mx-2">{children}</Text>
  );
}
