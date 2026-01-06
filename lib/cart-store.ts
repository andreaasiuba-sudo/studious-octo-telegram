"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "./types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, material: string, size?: string) => void;
  removeItem: (productId: string, material: string, size?: string) => void;
  updateQuantity: (productId: string, material: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, material: string, size?: string) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedMaterial === material &&
            item.selectedSize === size
        );

        if (existingIndex > -1) {
          const newItems = [...items];
          newItems[existingIndex].quantity += 1;
          set({ items: newItems });
        } else {
          set({
            items: [
              ...items,
              {
                product,
                quantity: 1,
                selectedMaterial: material,
                selectedSize: size,
              },
            ],
          });
        }
      },

      removeItem: (productId: string, material: string, size?: string) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedMaterial === material &&
                item.selectedSize === size
              )
          ),
        });
      },

      updateQuantity: (productId: string, material: string, quantity: number, size?: string) => {
        if (quantity <= 0) {
          get().removeItem(productId, material, size);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product.id === productId &&
            item.selectedMaterial === material &&
            item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);


