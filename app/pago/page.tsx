"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/ui/Input";
import { useCartStore } from "@/lib/cart-store";

const checkoutSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  direccion: z.string().min(5, "La dirección es obligatoria"),
  ciudad: z.string().min(2, "La ciudad es obligatoria"),
  codigoPostal: z.string().min(4, "Código postal inválido"),
  pais: z.string().min(2, "El país es obligatorio"),
  envio: z.enum(["estandar", "express"]),
  metodoPago: z.enum(["tarjeta", "paypal"]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();

  const DISCOUNT_CODE = "10PERAYLIMON";
  const DISCOUNT_PERCENTAGE = 10;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      envio: "estandar",
      metodoPago: "tarjeta",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const envio = watch("envio");
  const metodoPago = watch("metodoPago");

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    console.log("Order data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    setIsComplete(true);
    setIsSubmitting(false);
  };

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

  const subtotal = getTotal();
  const discount = discountApplied ? subtotal * (DISCOUNT_PERCENTAGE / 100) : 0;
  const total = subtotal - discount;
  const shippingCost = envio === "express" ? 9.95 : 0;
  const finalTotal = total + shippingCost;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === DISCOUNT_CODE) {
      setDiscountApplied(true);
    } else {
      alert("Código de descuento inválido");
    }
  };

  if (items.length === 0 && !isComplete) {
    router.push("/cart");
    return null;
  }

  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-24"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-24 h-24 bg-foreground rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-background"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>

                <h1 className="font-serif text-4xl text-foreground mb-4">
                  Tu regalo está listo
                </h1>
                <p className="font-sans text-muted max-w-md mx-auto mb-12">
                  Hemos recibido tu pedido. Recibirás un email de confirmación pronto.
                </p>

                <motion.button
                  onClick={() => router.push("/home")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-colors"
                >
                  Volver al inicio
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                {/* Page Header */}
                <div className="text-center mb-12">
                  <h1 className="font-serif text-4xl text-foreground mb-4">
                    Checkout
                  </h1>
                  <p className="font-sans text-muted">
                    Un paso más para completar tu regalo
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form Fields */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Contact Info */}
                      <section>
                        <h2 className="font-serif text-xl text-foreground mb-6">
                          Información de contacto
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input
                            label="Nombre completo"
                            placeholder="Tu nombre"
                            {...register("nombre")}
                            error={errors.nombre?.message}
                          />
                          <Input
                            label="Email"
                            type="email"
                            placeholder="tu@email.com"
                            {...register("email")}
                            error={errors.email?.message}
                          />
                        </div>
                      </section>

                      {/* Shipping Address */}
                      <section>
                        <h2 className="font-serif text-xl text-foreground mb-6">
                          Dirección de envío
                        </h2>
                        <div className="space-y-4">
                          <Input
                            label="Dirección"
                            placeholder="Calle, número, piso..."
                            {...register("direccion")}
                            error={errors.direccion?.message}
                          />
                          <div className="grid sm:grid-cols-3 gap-4">
                            <Input
                              label="Ciudad"
                              placeholder="Ciudad"
                              {...register("ciudad")}
                              error={errors.ciudad?.message}
                            />
                            <Input
                              label="Código postal"
                              placeholder="00000"
                              {...register("codigoPostal")}
                              error={errors.codigoPostal?.message}
                            />
                            <Input
                              label="País"
                              placeholder="España"
                              {...register("pais")}
                              error={errors.pais?.message}
                            />
                          </div>
                        </div>
                      </section>

                      {/* Shipping Method */}
                      <section>
                        <h2 className="font-serif text-xl text-foreground mb-6">
                          Método de envío
                        </h2>
                        <div className="space-y-3">
                          <label
                            className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                              envio === "estandar"
                                ? "border-foreground"
                                : "border-border hover:border-foreground/50"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <input
                                type="radio"
                                value="estandar"
                                {...register("envio")}
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  envio === "estandar"
                                    ? "border-foreground"
                                    : "border-border"
                                }`}
                              >
                                {envio === "estandar" && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-sans text-sm text-foreground">
                                  Envío estándar
                                </p>
                                <p className="font-sans text-xs text-muted">
                                  3-5 días laborables
                                </p>
                              </div>
                            </div>
                            <span className="font-sans text-sm text-foreground">
                              Gratis
                            </span>
                          </label>

                          <label
                            className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                              envio === "express"
                                ? "border-foreground"
                                : "border-border hover:border-foreground/50"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <input
                                type="radio"
                                value="express"
                                {...register("envio")}
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  envio === "express"
                                    ? "border-foreground"
                                    : "border-border"
                                }`}
                              >
                                {envio === "express" && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-sans text-sm text-foreground">
                                  Envío exprés
                                </p>
                                <p className="font-sans text-xs text-muted">
                                  1-2 días laborables
                                </p>
                              </div>
                            </div>
                            <span className="font-sans text-sm text-foreground">
                              9,95 €
                            </span>
                          </label>
                        </div>
                      </section>

                      {/* Payment Method */}
                      <section>
                        <h2 className="font-serif text-xl text-foreground mb-6">
                          Método de pago
                        </h2>
                        <div className="space-y-3">
                          <label
                            className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                              metodoPago === "tarjeta"
                                ? "border-foreground"
                                : "border-border hover:border-foreground/50"
                            }`}
                          >
                            <input
                              type="radio"
                              value="tarjeta"
                              {...register("metodoPago")}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                metodoPago === "tarjeta"
                                  ? "border-foreground"
                                  : "border-border"
                              }`}
                            >
                              {metodoPago === "tarjeta" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="font-sans text-sm text-foreground">
                                Tarjeta de crédito / débito
                              </p>
                              <p className="font-sans text-xs text-muted">
                                Visa, Mastercard, American Express
                              </p>
                            </div>
                          </label>

                          <label
                            className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                              metodoPago === "paypal"
                                ? "border-foreground"
                                : "border-border hover:border-foreground/50"
                            }`}
                          >
                            <input
                              type="radio"
                              value="paypal"
                              {...register("metodoPago")}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                metodoPago === "paypal"
                                  ? "border-foreground"
                                  : "border-border"
                              }`}
                            >
                              {metodoPago === "paypal" && (
                                <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                              )}
                            </div>
                            <p className="font-sans text-sm text-foreground">
                              PayPal
                            </p>
                          </label>
                        </div>

                        {metodoPago === "tarjeta" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 p-4 bg-border/20 font-sans text-sm text-muted"
                          >
                            Este es un checkout de demostración. No se procesará ningún pago real.
                          </motion.div>
                        )}
                      </section>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                      <div className="bg-border/20 p-8 sticky top-28">
                        <h3 className="font-serif text-xl text-foreground mb-6">
                          Tu pedido
                        </h3>

                        {/* Items */}
                        <div className="space-y-4 mb-6">
                          {items.map((item) => (
                            <div
                              key={`${item.product.id}-${item.selectedMaterial}-${item.selectedSize}`}
                              className="flex gap-4"
                            >
                              <div className="w-16 h-16 bg-accent/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-sans text-sm text-foreground">
                                  {item.product.name}
                                </p>
                                <p className="font-sans text-xs text-muted">
                                  x{item.quantity}
                                </p>
                              </div>
                              <p className="font-sans text-sm text-foreground">
                                {item.product.price * item.quantity} €
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Discount Code */}
                        {!discountApplied && (
                          <div className="mb-6 pb-6 border-b border-border">
                            <h4 className="font-sans text-sm text-foreground mb-3">
                              Código de descuento
                            </h4>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                placeholder="Código"
                                className="flex-1 px-4 py-2 border border-border text-foreground font-sans text-sm focus:outline-none focus:border-foreground transition-colors"
                              />
                              <motion.button
                                type="button"
                                onClick={handleApplyDiscount}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 border border-foreground text-foreground font-sans text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors"
                              >
                                Aplicar
                              </motion.button>
                            </div>
                          </div>
                        )}

                        {discountApplied && (
                          <div className="mb-6 pb-6 border-b border-border">
                            <div className="flex items-center justify-between">
                              <span className="font-sans text-sm text-green-600">
                                Descuento aplicado ({DISCOUNT_PERCENTAGE}%)
                              </span>
                              <span className="font-sans text-sm text-green-600">
                                -{discount.toFixed(2)} €
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Totals */}
                        <div className="space-y-3 border-t border-border pt-4 mb-6">
                          <div className="flex justify-between font-sans text-sm">
                            <span className="text-muted">Subtotal</span>
                            <span className="text-foreground">{subtotal.toFixed(2)} €</span>
                          </div>
                          {discountApplied && (
                            <div className="flex justify-between font-sans text-sm">
                              <span className="text-muted">Descuento</span>
                              <span className="text-green-600">-{discount.toFixed(2)} €</span>
                            </div>
                          )}
                          <div className="flex justify-between font-sans text-sm">
                            <span className="text-muted">Envío</span>
                            <span className="text-foreground">
                              {shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2)} €`}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-border pt-4 mb-8">
                          <div className="flex justify-between font-sans">
                            <span className="text-foreground font-medium">Total</span>
                            <span className="text-foreground font-medium text-xl">
                              {finalTotal.toFixed(2)} €
                            </span>
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-foreground text-background font-sans text-sm tracking-wider hover:bg-foreground/90 transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Procesando...
                            </motion.span>
                          ) : (
                            "Confirmar pedido"
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </>
  );
}

