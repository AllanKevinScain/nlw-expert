import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { add, remove } from "./helpers";
import { ProductProps, StateProps } from "@/types";

export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],

      add: (product: ProductProps) =>
        set((s) => ({ products: add(s.products, product) })),

      remove: (producId: string) =>
        set((s) => ({ products: remove(s.products, producId) })),

      clear: () => set(() => ({ products: [] })),
    }),
    {
      name: "nwl-expert:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
