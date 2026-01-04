"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/producto/${product.slug}`} className="group block">
        <div className="relative aspect-square bg-accent/20 overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.tags.includes("nuevo") && (
              <span className="px-2 py-1 bg-foreground text-background text-[10px] font-sans tracking-wider">
                NUEVO
              </span>
            )}
            {product.tags.includes("bestseller") && (
              <span className="px-2 py-1 bg-background text-foreground border border-foreground text-[10px] font-sans tracking-wider">
                MÁS VENDIDO
              </span>
            )}
            {product.isSpecial && (
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-[10px] font-sans tracking-wider">
                EDICIÓN ESPECIAL
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-lg text-foreground group-hover:opacity-70 transition-opacity">
            {product.name}
          </h3>
          <p className="font-sans text-sm text-muted">
            {product.shortDescription}
          </p>
          <p className="font-sans text-sm text-foreground">
            {product.slug === "experiencia-misteriosa" ? "????" : `${product.price} €`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

