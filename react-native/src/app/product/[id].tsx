import { Image, Text, View } from "react-native";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { CustomButton, LinkButton } from "@/components";
import { PRODUCTS } from "@/utils";
import { formatCurrency } from "@/utils";
import { useCartStore } from "@/stores";

export default function Product() {
  const { id } = useLocalSearchParams();
  const { add } = useCartStore();
  const navigate = useNavigation();

  const product = PRODUCTS.find((i) => i.id === id);

  function addProductToCart() {
    if (!!product) {
      add(product);
      navigate.goBack();
    }
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-white text-xl font-heading">{product.title}</Text>
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((i) => (
          <Text
            key={i}
            className="text-slate-400 font-bold text-base leading-6"
          >
            {"\u2022"} {i}
          </Text>
        ))}

        <View className="pt-6 pb-8 gap-5">
          <CustomButton.Root onPress={addProductToCart}>
            <CustomButton.Icon>
              <Feather name="plus-circle" size={20} />
            </CustomButton.Icon>
            <CustomButton.Text>Adicionar ao pedido</CustomButton.Text>
          </CustomButton.Root>

          <LinkButton title="Voltar ao cardápio" href="/" />
        </View>
      </View>
    </View>
  );
}
