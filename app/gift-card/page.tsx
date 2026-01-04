"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/lib/cart-store";

const giftCardValues = [50, 100, 150];
const giftCardColors = [
  "bg-amber-100",  // 50€ - más suave
  "bg-amber-200",  // 100€ - medio
  "bg-amber-400",  // 150€ - más oscuro
];

export default function GiftCardPage() {
  const [selectedValue, setSelectedValue] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [isGift, setIsGift] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Crear un producto temporal para la gift card
    const giftCardProduct = {
      id: `gift-card-${selectedValue}`,
      slug: `gift-card-${selectedValue}`,
      name: `Gift Card ${selectedValue}€`,
      price: selectedValue,
      description: `Tarjeta de regalo de ${selectedValue}€ para Pera y Limón`,
      shortDescription: "Tarjeta de regalo",
      category: "gift-card" as const,
      materials: [],
      images: [],
      tags: ["regalo"] as ("nuevo" | "bestseller" | "regalo" | "especial")[],
      details: "Esta tarjeta de regalo no tiene fecha de caducidad",
      care: "La tarjeta se enviará por correo electrónico",
      stock: 999,
    };

    // Añadir la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addItem(giftCardProduct, "gift-card");
    }

    setIsAdding(false);
    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  };

  const selectedColorIndex = giftCardValues.indexOf(selectedValue);

  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Gift Card Previews */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 flex flex-col items-center md:items-start"
            >
              {giftCardValues.map((value, index) => {
                const isSelected = selectedValue === value;
                return (
                  <motion.div
                    key={value}
                    onClick={() => setSelectedValue(value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all w-full max-w-[280px] ${
                      isSelected ? "ring-2 ring-foreground" : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className={`${giftCardColors[index]} p-6 aspect-[4/3] flex flex-col justify-between`}>
                      <div className="flex justify-between items-start w-full">
                        <div className="font-serif text-sm text-foreground/80 leading-tight">PERA Y LIMÓN</div>
                        <div className="font-sans text-xl font-bold text-foreground">{value}€</div>
                      </div>
                      <div className="font-serif text-2xl font-light text-foreground">
                        Gift Card
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right: Details and Purchase */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                  Gift Card
                </h1>
                <p className="font-sans text-2xl text-foreground mb-6">
                  {selectedValue}€
                </p>
              </div>

              <div className="space-y-4 font-sans text-sm text-muted leading-relaxed">
                <p>
                  La forma perfecta de compartir Pera y Limón. Ideal para quienes buscan un detalle especial, para momentos en los que quieres dar libertad de elección, o simplemente para sorprender a alguien especial.
                </p>
                <div className="bg-accent/10 p-4 border border-border/50">
                  <p className="text-xs font-medium text-foreground mb-1">
                    Información importante:
                  </p>
                  <p className="text-xs text-muted">
                    Esta tarjeta de regalo de Pera y Limón no expira, sin embargo no es reembolsable en efectivo. Recibirás el código por correo electrónico al completar tu compra.
                  </p>
                </div>
              </div>

              {/* Value Selection */}
              <div>
                <h4 className="font-sans text-sm text-foreground mb-3">
                  Valor:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {giftCardValues.map((value) => (
                    <button
                      key={value}
                      onClick={() => setSelectedValue(value)}
                      className={`px-6 py-3 border font-sans text-sm transition-colors ${
                        selectedValue === value
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {value}€
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h4 className="font-sans text-sm text-foreground mb-3">
                  Cantidad:
                </h4>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center"
                    aria-label="Reducir cantidad"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <span className="font-sans text-lg text-foreground min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center"
                    aria-label="Aumentar cantidad"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Gift Option */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isGift"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="w-4 h-4 border-border text-foreground focus:ring-foreground"
                />
                <label htmlFor="isGift" className="font-sans text-sm text-foreground cursor-pointer">
                  Quiero enviar esto como un regalo.
                </label>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={isAdding}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 font-sans text-sm tracking-wider transition-colors ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-foreground text-background hover:bg-foreground/90"
                } disabled:opacity-50`}
              >
                {isAdding ? "Añadiendo..." : added ? "¡Añadido!" : "AÑADIR A LA CESTA"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

