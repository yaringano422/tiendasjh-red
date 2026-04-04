import { useStore } from "../context/StoreContext";
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useStore();

  if (!isOpen) return null;

  const handleCheckoutWhatsApp = () => {
    const numeroTelefono = "51960097010";

    let mensaje =
      "¡Hola Tienda Jhared! 👋 Me interesa concretar la compra de los siguientes equipos de mi carrito:\n\n";

    cart.forEach((item: any) => {
      // Usamos item.fullName o item.phone.fullName dependiendo de tu interfaz
      const nombre = item.fullName || item.phone?.fullName || "Producto";
      const cantidad = item.quantity;
      const precioTotal = (item.price || item.phone?.price || 0) * cantidad;

      mensaje += `* ${cantidad}x ${nombre} (S/${precioTotal.toFixed(2)})\n`;
    });

    mensaje += `\n*Total a pagar: S/${cartTotal.toFixed(2)}*\n\n¿Tienen stock disponible para coordinar el pago?`;

    // Codifica el mensaje para que sea válido en una URL
    const mensajeEncriptado = encodeURIComponent(mensaje);
    const urlWhatsapp = `https://wa.me/${numeroTelefono}?text=${mensajeEncriptado}`;

    // Abre WhatsApp en una pestaña nueva
    window.open(urlWhatsapp, "_blank");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Carrito ({cartCount})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item: any) => {
                // Mapeo seguro por si las propiedades están anidadas en item.phone
                const id = item.id || item.phone?.id;
                const fullName = item.fullName || item.phone?.fullName;
                const connectivity =
                  item.connectivity || item.phone?.connectivity;
                const ram = item.ram || item.phone?.ram;
                const storage = item.storage || item.phone?.storage;
                const price = item.price || item.phone?.price || 0;

                return (
                  <div key={id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {fullName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {connectivity} | {ram} | {storage}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(id)}
                        className="p-1 hover:bg-red-100 rounded text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(id, item.quantity - 1)}
                          className="p-1 bg-white border rounded hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(id, item.quantity + 1)}
                          className="p-1 bg-white border rounded hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold text-lg">
                        S/{(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                S/{cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={clearCart}
              className="w-full mb-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 font-medium"
            >
              Vaciar Carrito
            </button>

            {/* BOTÓN DE WHATSAPP SIMULANDO PASARELA */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3 bg-green-600 text-white flex items-center justify-center gap-2 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Pedir por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
