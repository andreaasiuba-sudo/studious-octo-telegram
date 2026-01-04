"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItemComponent from "@/components/shop/CartItem";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-32 pb-16 flex items-center justify-center">
          <p className="font-sans text-muted">Cargando...</p>
        </main>
        <Footer />
      </>
    );
  }

  const total = getTotal();
  const isEmpty = items.length === 0;

  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl text-foreground mb-4">
              Tu carrito
            </h1>
            {!isEmpty && (
              <p className="font-sans text-muted">
                {items.length} artículo{items.length !== 1 ? "s" : ""}
              </p>
            )}
          </motion.div>

          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 border border-border rounded-full flex items-center justify-center mx-auto mb-8">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-muted"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                Tu carrito está vacío
              </h2>
              <p className="font-sans text-muted mb-8">
                Explora nuestra colección y encuentra algo especial.
              </p>
              <motion.button
                onClick={() => router.push("/shop")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-colors"
              >
                Ver colección
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItemComponent
                      key={`${item.product.id}-${item.selectedMaterial}-${item.selectedSize}`}
                      item={item}
                    />
                  ))}
                </AnimatePresence>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={clearCart}
                  className="mt-6 font-sans text-xs text-muted hover:text-foreground transition-colors underline"
                >
                  Vaciar carrito
                </motion.button>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-[#F5F5F3] p-8 sticky top-28">
                  <h3 className="font-serif text-xl text-foreground mb-6">
                    Resumen
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-muted">Subtotal</span>
                      <span className="text-foreground">{total} €</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-muted">Envío</span>
                      <span className="text-foreground">Gratis</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-8">
                    <div className="flex justify-between font-sans">
                      <span className="text-foreground font-medium">Total</span>
                      <span className="text-foreground font-medium text-xl">
                        {total} €
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => router.push("/pago")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-colors"
                  >
                    Continuar
                  </motion.button>

                  <p className="mt-6 font-sans text-xs text-muted text-center">
                    Envío gratis en todos los pedidos
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}


