import { useState, useMemo, useEffect } from "react"; // 👈 Agregamos useEffect
import { PhoneCard } from "./components/PhoneCard";
import { FilterBar } from "./components/FilterBar";
import { CartDrawer } from "./components/CartDrawer";
import { CompareDrawer } from "./components/CompareDrawer";
import { ContactSection } from "./components/ContactSection";
import { StoreProvider, useStore } from "./context/StoreContext";
import { useGetPhones } from "../hooks/useGetPhones";
import { Smartphone, ShoppingCart, GitCompare, Loader2 } from "lucide-react";

// 🌐 Función para generar Slugs (necesaria para comparar con la URL)
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

function AppContent() {
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // 🚀 Estado para saber qué producto abrir desde la URL
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(
    null,
  );

  const { cartCount, compareList } = useStore();

  // 2. LLAMAMOS AL HOOK (Solo aquí adentro, borramos el de afuera)
  const { phones, loading } = useGetPhones();

  console.log("📡 Estado actual de phones:", phones);

  // 🚀 Escuchamos la URL al cargar la página
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slugFromUrl = params.get("producto");
    if (slugFromUrl) {
      setActiveProductSlug(slugFromUrl);
    }
  }, []);

  // 3. Reemplazamos 'phonesData' por 'phones' que viene de la base de datos
  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => {
      const matchesBrand =
        selectedBrand === "Todos" ||
        (phone.brand as string)
          .toLowerCase()
          .includes(selectedBrand.toLowerCase().split("/")[0]);

      const matchesSearch =
        phone.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.sku?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesBrand && matchesSearch;
    });
  }, [selectedBrand, searchTerm, phones]);

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
          selectedBrand={selectedBrand as any}
          onBrandChange={setSelectedBrand as any}
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

        {/* 4. AGREGAMOS LA VISTA DE CARGA AQUÍ */}
        {loading ? (
          <div className="text-center py-16 flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-xl text-gray-500">Cargando catálogo...</p>
          </div>
        ) : sortedPhones.length === 0 ? (
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
              <PhoneCard
                key={phone.id}
                phone={phone as any}
                isInitiallyOpen={
                  activeProductSlug === generateSlug(phone.fullName)
                } // 👈 Enviamos la prop mágica
              />
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
