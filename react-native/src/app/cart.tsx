import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";

import { Header, Input, Product, CustomButton, LinkButton } from "@/components";
import { useCartStore } from "@/stores";
import { formatCurrency } from "@/utils";
import { ProductsCartProps } from "@/types";

export default function Cart() {
  const navigate = useNavigation();
  const { products, remove, clear } = useCartStore();

  const [address, setAddress] = useState<string>("");

  const total = formatCurrency(
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function removeProductFromCart(value: ProductsCartProps) {
    Alert.alert("Remover", `Deseja remover ${value.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => remove(value.id),
      },
    ]);
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }

    const modifiedProducts = products.map(
      (p) => `\n ${p.quantity} ${p.title} \n`
    );
    const joinModifiedProducts = modifiedProducts.join("");
    const message = `NOVO PEDIDO\nEntregar em: ${address}\n${joinModifiedProducts}\nValor total: ${total}`;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=5551995368765&text=${message}`
    );
    clear();
    navigate.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {products.length > 0 ? (
              <View className="border-b border-slate-600">
                {products.map((i) => {
                  const { id } = i;

                  return (
                    <Product
                      key={id}
                      data={i}
                      onPress={() => removeProductFromCart(i)}
                    />
                  );
                })}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total</Text>
              <Text className="text-lime-300 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              value={address}
              onChangeText={(e) => setAddress(e)}
              onSubmitEditing={handleOrder}
              blurOnSubmit={true}
              returnKeyType="next"
              placeholder="Informa o endereço de entrega com rua, bairro, CEp, número e complemento..."
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <CustomButton.Root onPress={handleOrder}>
          <CustomButton.Text>Enviar pedido</CustomButton.Text>
          <CustomButton.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </CustomButton.Icon>
        </CustomButton.Root>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
