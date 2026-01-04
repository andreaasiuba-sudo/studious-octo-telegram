"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-background border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl tracking-wider text-foreground mb-4">
              PERA Y LIMÓN
            </h3>
            <p className="font-sans text-sm text-muted leading-relaxed">
              Accesorios que susurran historias. Piezas artesanales que abrazan tu esencia y celebran lo irrepetible que hay en ti.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-sm text-foreground mb-4 tracking-wide">
              Navegación
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/inicio"
                className="font-sans text-sm text-muted hover:text-foreground transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/coleccion"
                className="font-sans text-sm text-muted hover:text-foreground transition-colors"
              >
                Colección
              </Link>
              <Link
                href="/nuestra-historia"
                className="font-sans text-sm text-muted hover:text-foreground transition-colors"
              >
                Nuestra Historia
              </Link>
              <Link
                href="/contacto"
                className="font-sans text-sm text-muted hover:text-foreground transition-colors"
              >
                Contacto
              </Link>
              <Link
                href="/carrito"
                className="font-sans text-sm text-muted hover:text-foreground transition-colors"
              >
                Carrito
              </Link>
              <Link
                href="/gift-card"
                className="font-sans text-sm text-muted hover:text-foreground transition-colors"
              >
                Gift Card
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-sans text-sm text-foreground mb-4 tracking-wide">
              Contacto
            </h4>
            <p className="font-sans text-sm text-muted">
              andrea@peraylimon.com
            </p>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="mb-6">
            <h4 className="font-sans text-xs text-muted uppercase tracking-wider text-center mb-4">
              Métodos de pago
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Visa */}
              <div className="px-3 py-2 bg-white border border-border rounded flex items-center justify-center h-8">
                <span className="font-bold text-blue-800 text-xs tracking-wider">VISA</span>
              </div>
              
              {/* Mastercard */}
              <div className="px-3 py-2 bg-white border border-border rounded flex items-center justify-center h-8">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-orange-500 -ml-2"></div>
                </div>
              </div>
              
              {/* American Express */}
              <div className="px-3 py-2 bg-blue-600 rounded flex items-center justify-center h-8">
                <span className="text-white text-[10px] font-bold">AM<br/>EX</span>
              </div>
              
              {/* Apple Pay */}
              <div className="px-3 py-2 bg-white border border-border rounded flex items-center justify-center h-8">
                <span className="text-black text-xs font-medium">Apple Pay</span>
              </div>
              
              {/* Google Pay */}
              <div className="px-3 py-2 bg-white border border-border rounded flex items-center justify-center h-8">
                <span className="text-gray-600 text-xs font-medium">Google Pay</span>
              </div>
              
              {/* Shop Pay */}
              <div className="px-3 py-2 bg-purple-600 rounded flex items-center justify-center h-8">
                <span className="text-white text-xs font-medium">shop</span>
              </div>
              
              {/* iDEAL */}
              <div className="px-3 py-2 bg-white border border-border rounded flex items-center justify-center h-8">
                <span className="text-black text-xs font-bold">iDEAL</span>
              </div>
              
              {/* Bancontact */}
              <div className="px-3 py-2 bg-white border border-border rounded flex items-center justify-center h-8">
                <span className="text-black text-xs font-medium">Bancontact</span>
              </div>
              
              {/* UnionPay */}
              <div className="px-3 py-2 rounded flex items-center justify-center h-8 overflow-hidden">
                <div className="w-full h-full flex flex-col">
                  <div className="w-full h-1/2 bg-red-600 flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">UnionPay</span>
                  </div>
                  <div className="w-full h-1/2 bg-green-600 flex items-center justify-center">
                    <span className="text-white text-[8px]">银联</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="font-sans text-xs text-muted text-center">
            © 2026 PERA Y LIMÓN ™. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

