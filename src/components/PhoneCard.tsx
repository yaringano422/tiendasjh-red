import { useState } from "react";
import { Phone } from "../types/phones";
import {
  Cpu,
  HardDrive,
  Wifi,
  ShoppingCart,
  GitCompare,
  Layers3,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import { getPhoneImage } from "../utils/phoneImages";
import { Helmet } from "react-helmet-async";

interface PhoneCardProps {
  phone: Phone;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const { addToCart, addToCompare } = useStore();
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-card border border-zinc-200 dark:border-border rounded-xl shadow-sm hover:border-primary/50 hover:shadow-primary/10 transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
      {isOpen && (
        <Helmet>
          <title>{`${phone.fullName} | Tienda Jhared`}</title>
          <meta
            name="description"
            content={`Compra el ${phone.fullName} en Tienda Jhared. Especificaciones: ${phone.ram} RAM y ${phone.storage} de almacenamiento.`}
          />
        </Helmet>
      )}

      {/* Contenedor de Imagen */}
      <div
        className="relative h-52 border-b border-zinc-100 dark:border-border overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={
            phone.images && phone.images.length > 0
              ? phone.images[currentImage]
              : getPhoneImage(phone.brand)
          }
          alt={phone.fullName}
          loading="lazy"
          onMouseEnter={() => {
            if (phone.images && phone.images.length > 1) {
              setCurrentImage(1);
            }
          }}
          onMouseLeave={() => {
            setCurrentImage(0);
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-background to-transparent opacity-70"></div>
      </div>

      {/* MODAL / VISOR DE IMÁGENES */}
      {isOpen && phone.images && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white/90 dark:bg-background/60 border border-zinc-200 dark:border-[var(--glass-border)] p-5 rounded-2xl max-w-xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800 dark:text-foreground/50 dark:hover:text-foreground transition-colors p-1.5 bg-zinc-100 dark:bg-accent/50 rounded-full"
            >
              ✕
            </button>

            <img
              src={phone.images[currentImage]}
              alt={phone.fullName}
              className="w-full h-auto max-h-[70vh] object-contain mb-5 rounded-lg"
            />

            {/* Navegación de Imágenes en Modal */}
            <div className="flex justify-between items-center gap-4">
              {phone.images.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentImage(
                      currentImage === 0
                        ? phone.images.length - 1
                        : currentImage - 1,
                    )
                  }
                  className="px-4 py-2.5 bg-zinc-100 dark:bg-accent/50 text-zinc-800 dark:text-foreground rounded-lg hover:bg-zinc-200 dark:hover:bg-accent transition-colors"
                >
                  ←
                </button>
              )}

              {/* Miniaturas en el modal */}
              <div className="flex gap-2.5 justify-center overflow-x-auto py-1">
                {phone.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${phone.fullName}-${index}`}
                    onClick={() => setCurrentImage(index)}
                    className={`w-16 h-16 object-cover cursor-pointer border-2 rounded-lg transition-all ${
                      currentImage === index
                        ? "border-primary"
                        : "border-zinc-200 dark:border-border hover:border-zinc-400 dark:hover:border-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {phone.images.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentImage(
                      currentImage === phone.images.length - 1
                        ? 0
                        : currentImage + 1,
                    )
                  }
                  className="px-4 py-2.5 bg-zinc-100 dark:bg-accent/50 text-zinc-800 dark:text-foreground rounded-lg hover:bg-zinc-200 dark:hover:bg-accent transition-colors"
                >
                  →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Detalles del Producto */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-zinc-100 dark:bg-accent text-zinc-800 dark:text-foreground mb-2.5 border border-zinc-200 dark:border-border">
              <Layers3 className="w-3.5 h-3.5 text-primary" />
              {phone.brand}
            </span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-foreground mb-1 group-hover:text-primary transition-colors">
              {phone.fullName}
            </h3>
          </div>

          {/* Especificaciones */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 pt-1">
            <div className="flex items-center text-sm text-zinc-600 dark:text-foreground/70 bg-zinc-50 dark:bg-accent/30 p-2 rounded-lg border border-zinc-100 dark:border-border">
              <Wifi className="w-4 h-4 mr-2.5 text-primary" />
              <span>{phone.connectivity}</span>
            </div>

            {phone.ram !== "-" && (
              <div className="flex items-center text-sm text-zinc-600 dark:text-foreground/70 bg-zinc-50 dark:bg-accent/30 p-2 rounded-lg border border-zinc-100 dark:border-border">
                <Cpu className="w-4 h-4 mr-2.5 text-primary" />
                <span>{phone.ram} RAM</span>
              </div>
            )}

            {phone.storage !== "-" && (
              <div className="flex items-center text-sm text-zinc-600 dark:text-foreground/70 bg-zinc-50 dark:bg-accent/30 p-2 rounded-lg border border-zinc-100 dark:border-border">
                <HardDrive className="w-4 h-4 mr-2.5 text-primary" />
                <span>{phone.storage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Precio y Botones */}
        <div className="border-t border-zinc-100 dark:border-border pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-foreground tracking-tight">
              S/{phone.price.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-3">
            {/* BOTÓN AGREGAR CORREGIDO CON CONTRASTE ALTO */}
            <button
              onClick={() => addToCart(phone)}
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 bg-zinc-900 dark:bg-primary text-white dark:text-white rounded-xl hover:bg-zinc-800 dark:hover:bg-primary/90 transition-all font-semibold shadow-lg shadow-zinc-900/10 dark:shadow-primary/20 active:scale-[0.98]"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="text-white">Agregar</span>
            </button>
            <button
              onClick={() => addToCompare(phone)}
              className="px-4 py-3 border border-zinc-200 dark:border-border bg-white dark:bg-accent/50 text-zinc-700 dark:text-foreground/70 rounded-xl hover:bg-zinc-50 dark:hover:bg-accent hover:text-zinc-900 dark:hover:text-foreground transition-colors"
              title="Comparar"
            >
              <GitCompare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
