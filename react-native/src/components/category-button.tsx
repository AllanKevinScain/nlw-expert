import { Pressable, Text } from "react-native";
import { clsx } from "clsx";
import { CategoryButtonInterface } from "@/types";

export function CategoryButton(props: CategoryButtonInterface) {
  const { title, isSeleted = false, ...rest } = props;

  return (
    <Pressable
      {...rest}
      className={clsx(
        "bg-slate-800 px-4 justify-center rounded-md h-10",
        isSeleted && "border-2 border-lime-300"
      )}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
}
