# PERA Y LIMÓN - Accesorios con Identidad

Una experiencia web completa que combina un portal privado con clave secreta, una carta digital editorial y un e-commerce minimalista de accesorios premium.

## ✨ Características

- **Portal Privado**: Acceso con clave secreta (clave: `paraTi`)
- **Carta Digital**: Experiencia romántica y editorial con revelado secuencial
- **E-commerce Completo**: Catálogo, producto, carrito y checkout
- **Diseño Minimalista**: Lujo silencioso con mucho espacio en blanco
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Carrito Persistente**: Estado guardado en localStorage
- **Formularios Validados**: React Hook Form + Zod

## 🛠 Stack Tecnológico

- **Next.js 13.5** (App Router)
- **TypeScript**
- **TailwindCSS 3.4**
- **Zustand** (gestión de estado)
- **Framer Motion** (animaciones)
- **React Hook Form + Zod** (formularios)
- **next/font/google** (tipografías)

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Fondo | `#FAFAF7` | Background principal |
| Texto | `#111111` | Texto principal |
| Gris | `#6B7280` | Texto secundario |
| Bordes | `#E5E7EB` | Líneas y separadores |
| Sage | `#E8EBE0` | Color de acento |

## 📁 Estructura del Proyecto

```
/app
  page.tsx              # Portal con clave
  /letter
    page.tsx            # Carta digital
  /home
    page.tsx            # Home del e-commerce
  /shop
    page.tsx            # Catálogo de productos
  /product/[slug]
    page.tsx            # Página de producto
  /cart
    page.tsx            # Carrito de compras
  /checkout
    page.tsx            # Proceso de compra
  /story
    page.tsx            # Nuestra historia
  /contact
    page.tsx            # Contacto
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔐 Flujo de Usuario

1. **/** → Portal con clave (clave: `paraTi`)
2. **/letter** → Carta digital romántica (revelado frase a frase)
3. **/home** → Home del e-commerce
4. **/shop** → Catálogo de accesorios
5. **/product/[slug]** → Detalle de producto
6. **/cart** → Carrito de compras
7. **/checkout** → Proceso de pago (mock)

## 💍 Accesorios

3 piezas exclusivas montadas a mano en Ámsterdam:
- Anillos
- Collares
- Pulseras

Materiales:
- Plata 925
- Oro Vermeil

## 📝 Notas

- Este es un proyecto de demostración para Andrea Cid
- El checkout es un mock (no procesa pagos reales)
- Las imágenes son de stock minimalista
- La clave de acceso es: `paraTi`

## 💖 Hecho con amor por Andrea Cid

Este proyecto fue creado como un regalo especial. No es una tienda genérica, es una experiencia íntima y personal.
