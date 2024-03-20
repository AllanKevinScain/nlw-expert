import { useRef, useState } from "react";
import { View, FlatList, SectionList, Text } from "react-native";
import { Link } from "expo-router";

import { CategoryButton, Header, Product } from "@/components";
import { CATEGORIES, MENU } from "@/utils";
import { useCartStore } from "@/stores";
import { ProductProps } from "@/types";

export default function Home() {
  const { products } = useCartStore();

  const [category, setCategory] = useState(CATEGORIES[0]);
  const sectionRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = products.reduce(
    (cont, product) => cont + product.quantity,
    0
  );

  function changeCategorySelect(cat: string) {
    setCategory(cat);

    const sectionIndex = CATEGORIES.findIndex((f) => f == cat);

    if (sectionRef.current) {
      sectionRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(i) => i}
        renderItem={(i) => {
          const { item } = i;
          return (
            <CategoryButton
              title={item}
              isSeleted={category === item}
              onPress={() => changeCategorySelect(item)}
            />
          );
        }}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionRef}
        sections={MENU}
        keyExtractor={(i) => i.id}
        stickySectionHeadersEnabled={false}
        renderItem={(i) => {
          const { item } = i;
          return (
            <Link href={`/product/${item.id}`} asChild>
              <Product data={item} />
            </Link>
          );
        }}
        renderSectionHeader={(i) => {
          const { section } = i;
          return (
            <Text className="text-white text-xl font-heading mt-8 mb-3">
              {section.title}
            </Text>
          );
        }}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
