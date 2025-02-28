import { Image, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { HeaderInterface } from "@/types";

export function Header(props: HeaderInterface) {
  const { title, cartQuantityItems = 0 } = props;

  const hasCartItems = !!cartQuantityItems;

  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>
      {hasCartItems && (
        <Link href="/cart" asChild>
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="top-2 z-10 -right-3.5 bg-lime-300 w-4 h-4 rounded-full justify-center items-center">
              <Text className="text-slate-900 font-bold text-xs">
                {cartQuantityItems}
              </Text>
            </View>
            <Feather name="shopping-bag" color={colors.white} size={24} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}
