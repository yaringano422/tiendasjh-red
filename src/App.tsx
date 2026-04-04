import { useState, useMemo } from "react";
import { PhoneCard } from "./components/PhoneCard";
import { FilterBar } from "./components/FilterBar";
import { CartDrawer } from "./components/CartDrawer";
import { CompareDrawer } from "./components/CompareDrawer";
import { ContactSection } from "./components/ContactSection";
import { StoreProvider, useStore } from "./context/StoreContext";
import { phonesData } from "./data/phones";
import { Smartphone, ShoppingCart, GitCompare } from "lucide-react";

function AppContent() {
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const { cartCount, compareList } = useStore();

  const filteredPhones = useMemo(() => {
    return phonesData.filter((phone) => {
      const matchesBrand =
        selectedBrand === "Todos" || phone.brand === selectedBrand;

      // Usamos ?. para que si es undefined no rompa la app
      const matchesSearch =
        phone.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.model?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesBrand && matchesSearch;
    });
  }, [selectedBrand, searchTerm]);

  const sortedPhones = useMemo(() => {
    return [...filteredPhones].sort((a, b) => a.price - b.price);
  }, [filteredPhones]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Catálogo de Celulares</h1>
                <p className="text-sm text-blue-100">
                  Encuentra el teléfono perfecto
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {/* Botón Comparar Corregido */}
              <button
                onClick={() => setIsCompareOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 bg-white text-slate-800 font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
              >
                <GitCompare className="w-5 h-5 text-purple-600" />
                <span className="hidden sm:inline">Comparar</span>
                {compareList.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {compareList.length}
                  </span>
                )}
              </button>

              {/* Botón Carrito Corregido */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2 bg-white text-slate-800 font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
              >
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span className="hidden sm:inline">Carrito</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Mostrando{" "}
            <span className="font-semibold text-gray-900">
              {sortedPhones.length}
            </span>{" "}
            productos
          </p>
          <p className="text-sm text-gray-500">
            Ordenado por precio (menor a mayor)
          </p>
        </div>

        {sortedPhones.length === 0 ? (
          <div className="text-center py-16">
            <Smartphone className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">No se encontraron productos</p>
            <p className="text-gray-400 mt-2">
              Intenta con otros filtros de búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedPhones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </main>

      <ContactSection />

      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2026 Catálogo de Celulares. Todos los precios en soles (S/). Todos
            los derechos reservados.
          </p>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
