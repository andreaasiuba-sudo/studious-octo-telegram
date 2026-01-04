"use client";

import { motion } from "framer-motion";
import { CartItem as CartItemType } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const materialLabel = item.selectedMaterial === "plata-925" ? "Plata 925" : "Oro Vermeil";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-6 py-6 border-b border-border"
    >
      {/* Image */}
      <div className="w-24 h-24 bg-accent/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg text-foreground">
            {item.product.name}
          </h3>
          <p className="font-sans text-sm text-muted mt-1">
            {materialLabel}
            {item.selectedSize && ` • Talla ${item.selectedSize}`}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.selectedMaterial,
                  item.quantity - 1,
                  item.selectedSize
                )
              }
              className="w-8 h-8 border border-border flex items-center justify-center font-sans text-sm hover:border-foreground transition-colors"
            >
              −
            </button>
            <span className="font-sans text-sm w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.selectedMaterial,
                  item.quantity + 1,
                  item.selectedSize
                )
              }
              className="w-8 h-8 border border-border flex items-center justify-center font-sans text-sm hover:border-foreground transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={() =>
              removeItem(item.product.id, item.selectedMaterial, item.selectedSize)
            }
            className="font-sans text-xs text-muted hover:text-foreground transition-colors underline"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-sans text-sm text-foreground">
          {item.product.price * item.quantity} €
        </p>
      </div>
    </motion.div>
  );
}

