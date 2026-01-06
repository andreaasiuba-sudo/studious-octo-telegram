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
                href="/cart"
                className="font-sans text-sm text-muted hover:text-foreground transition-colors"
              >
                Carrito
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

        <div className="mt-12 pt-8 border-t border-border">
          <p className="font-sans text-xs text-muted text-center">
            © 2026 PERA Y LIMÓN ™. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

