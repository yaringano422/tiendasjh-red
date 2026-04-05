import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Phone } from "../types/phones";

interface CartItem extends Phone {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  compareList: Phone[];
  addToCart: (phone: Phone) => void;
  removeFromCart: (phoneId: string) => void;
  updateQuantity: (phoneId: string, quantity: number) => void;
  clearCart: () => void;
  addToCompare: (phone: Phone) => void;
  removeFromCompare: (phoneId: string) => void;
  clearCompare: () => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  // 🔥 SOLUCIÓN: Cargamos directamente el localStorage en la inicialización
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [compareList, setCompareList] = useState<Phone[]>([]);

  // 💾 Ahora solo necesitamos UN efecto para guardar cuando el carrito cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (phone: Phone) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === phone.id);
      if (existing) {
        return prev.map((item) =>
          item.id === phone.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...phone, quantity: 1 }];
    });
  };

  const removeFromCart = (phoneId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== phoneId));
  };

  const updateQuantity = (phoneId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(phoneId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === phoneId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToCompare = (phone: Phone) => {
    if (compareList.length >= 4) {
      alert("Máximo 4 productos para comparar");
      return;
    }
    if (compareList.find((p) => p.id === phone.id)) {
      return;
    }
    setCompareList((prev) => [...prev, phone]);
  };

  const removeFromCompare = (phoneId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== phoneId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        compareList,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToCompare,
        removeFromCompare,
        clearCompare,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore debe usarse dentro de StoreProvider");
  }
  return context;
}
