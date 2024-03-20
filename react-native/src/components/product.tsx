import { Image, TouchableOpacity, View, Text } from "react-native";
import { forwardRef } from "react";
import { ProductInterface } from "@/types";

export const Product = forwardRef<TouchableOpacity, ProductInterface>(
  (props, ref) => {
    const { data, ...rest } = props;

    return (
      <TouchableOpacity
        ref={ref}
        {...rest}
        className="w-full flex-row items-center pb-4"
      >
        <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />

        <View className="flex-1 ml-3">
          <View className="flex flex-row items-center ">
            <Text className="text-slate-100 font-subtitle text-base flex-1">
              {data.title}
            </Text>
            {!!data.quantity && (
              <Text className="text-slate-400 text-xs leading-5 mt-0.5">
                x {data.quantity}
              </Text>
            )}
          </View>
          <Text className="text-slate-400 text-sm leading-5 mt-0.5">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);
