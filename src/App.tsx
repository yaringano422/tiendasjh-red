import { useState, useMemo, useEffect } from "react";
import { PhoneCard } from "./components/PhoneCard";
import { FilterBar } from "./components/FilterBar";
import { CartDrawer } from "./components/CartDrawer";
import { CompareDrawer } from "./components/CompareDrawer";
import { ContactSection } from "./components/ContactSection";
import { SmartFinder, SmartFilters } from "./components/SmartFinder";
import { StoreProvider, useStore } from "./context/StoreContext";
import { useGetPhones } from "../hooks/useGetPhones";
import {
  Smartphone,
  ShoppingCart,
  GitCompare,
  Loader2,
  Newspaper,
} from "lucide-react";

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
  const [activeSection, setActiveSection] = useState("inicio");
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(
    null,
  );

  const [smartFilters, setSmartFilters] = useState<SmartFilters>({
    maxPrice: null,
    profile: "todos",
    minRam: null,
    requires5G: null,
    minBattery: null,
    screenType: "todos",
    usage: "todos",
  });

  const { cartCount, compareList } = useStore();
  const { phones, loading } = useGetPhones();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slugFromUrl = params.get("producto");
    if (slugFromUrl) {
      setActiveProductSlug(slugFromUrl);
      setActiveSection("nuevos");
    }
  }, []);

  const filteredPhones = useMemo(() => {
    if (!phones) return [];

    return phones.filter((phone: any) => {
      // 🔥 Forzado temporal a 'any' para evitar que falle por propiedades faltantes en la interfaz
      let matchesCategory = false;
      if (activeSection === "nuevos" && phone.category_id === 1) {
        matchesCategory = true;
      } else if (
        activeSection === "reacondicionados" &&
        phone.category_id === 2
      ) {
        matchesCategory = true;
      } else if (activeSection === "pantallas" && phone.category_id === 3) {
        matchesCategory = true;
      } else if (activeSection === "cargadores" && phone.category_id === 4) {
        matchesCategory = true;
      } else if (activeSection === "audifonos" && phone.category_id === 5) {
        matchesCategory = true;
      }

      if (activeSection === "inicio") return false;

      const matchesBrand =
        selectedBrand === "Todos" ||
        (phone.brand as string)
          .toLowerCase()
          .includes(selectedBrand.toLowerCase().split("/")[0]);

      const matchesSearch =
        phone.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (phone.sku &&
          phone.sku.toLowerCase().includes(searchTerm.toLowerCase()));

      // ========================================================
      // FILTROS SMARTFINDER (CORREGIDOS)
      // ========================================================
      const matchesSmartPrice =
        smartFilters.maxPrice === null || phone.price <= smartFilters.maxPrice;

      let matchesSmartRam = true;
      if (smartFilters.minRam !== null && phone.ram) {
        const ramValue = parseInt(phone.ram.replace(/[^0-9]/g, "")) || 0;
        matchesSmartRam = ramValue >= smartFilters.minRam;
      }

      let matchesSmartScreen = true;
      if (smartFilters.screenType === "amoled_oled" && phone.screen) {
        const screenStr = (phone.screen as string).toUpperCase();
        matchesSmartScreen =
          screenStr.includes("AMOLED") || screenStr.includes("OLED");
      }

      let matchesSmartBattery = true;
      if (smartFilters.minBattery !== null && phone.battery) {
        const batteryValue =
          parseInt((phone.battery as string).replace(/[^0-9]/g, "")) || 0;
        matchesSmartBattery = batteryValue >= smartFilters.minBattery;
      }

      let matchesSmart5G = true;
      if (smartFilters.requires5G !== null && phone.connectivity) {
        const is5G = phone.connectivity.toUpperCase().includes("5G");
        matchesSmart5G = smartFilters.requires5G ? is5G : !is5G;
      }

      return (
        matchesCategory &&
        matchesBrand &&
        matchesSearch &&
        matchesSmartPrice &&
        matchesSmartRam &&
        matchesSmartScreen &&
        matchesSmartBattery &&
        matchesSmart5G
      );
    });
  }, [selectedBrand, searchTerm, phones, activeSection, smartFilters]);

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

      <nav className="bg-white shadow-sm border-b sticky top-[84px] z-20">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 overflow-x-auto py-3">
          {[
            { id: "inicio", label: "Inicio / Noticias", color: "bg-blue-600" },
            { id: "nuevos", label: "Nuevos (Sellados)", color: "bg-blue-600" },
            {
              id: "reacondicionados",
              label: "Reacondicionados",
              color: "bg-orange-500",
            },
            { id: "pantallas", label: "Pantallas", color: "bg-emerald-600" },
            { id: "cargadores", label: "Cargadores", color: "bg-purple-600" },
            { id: "audifonos", label: "Audífonos", color: "bg-rose-600" },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                activeSection === sec.id
                  ? `${sec.color} text-white shadow-md`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        =
        {activeSection === "inicio" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">
                Novedades Tecnológicas 2026
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wide">
                Repuestos
              </span>
              <h3 className="text-xl font-bold mt-1 text-slate-800">
                Las 5 mejores pantallas OLED para reponer este 2026
              </h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Descubre cuáles son los módulos de pantalla con mejor tasa de
                refresco, brillo y durabilidad...
              </p>
              <button className="text-blue-600 text-sm font-semibold mt-3 hover:underline">
                Leer más →
              </button>
            </div>
          </div>
        )}
        {activeSection !== "inicio" && (
          <>
            {(activeSection === "nuevos" ||
              activeSection === "reacondicionados") && (
              <SmartFinder
                currentFilters={smartFilters}
                onFilterChange={setSmartFilters}
              />
            )}

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

            {loading ? (
              <div className="text-center py-16 flex flex-col items-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-xl text-gray-500">Cargando catálogo...</p>
              </div>
            ) : sortedPhones.length === 0 ? (
              <div className="text-center py-16">
                <Smartphone className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">
                  No se encontraron productos en esta categoría o filtros
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
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <ContactSection />

      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2026 Catálogo de Celulares. Todos los precios en soles (S/).
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
