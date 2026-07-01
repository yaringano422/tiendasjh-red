import { useState } from "react";
import {
  Sparkles,
  DollarSign,
  Cpu,
  Wifi,
  RotateCcw,
  Check,
} from "lucide-react";

// Definimos la estructura de los filtros del recomendador
export interface SmartFilters {
  maxPrice: number | null;
  usage: "todos" | "basico" | "potente" | "gaming";
  requires5G: boolean | null;
}

interface SmartFinderProps {
  onFilterChange: (filters: SmartFilters) => void;
  currentFilters: SmartFilters;
}

export function SmartFinder({
  onFilterChange,
  currentFilters,
}: SmartFinderProps) {
  const [isActive, setIsActive] = useState(false);

  const handlePriceChange = (price: number | null) => {
    onFilterChange({ ...currentFilters, maxPrice: price });
  };

  const handleUsageChange = (usage: SmartFilters["usage"]) => {
    onFilterChange({ ...currentFilters, usage });
  };

  const handleWifiChange = (requires5G: boolean | null) => {
    onFilterChange({ ...currentFilters, requires5G });
  };

  const handleReset = () => {
    onFilterChange({
      maxPrice: null,
      usage: "todos",
      requires5G: null,
    });
  };

  // Verificar si hay algún filtro activo para mostrar el botón de limpiar
  const hasActiveFilters =
    currentFilters.maxPrice !== null ||
    currentFilters.usage !== "todos" ||
    currentFilters.requires5G !== null;

  return (
    <div className="w-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-200 dark:border-zinc-800 rounded-2xl p-6 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl text-white shadow-md animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
              ¿No sabes cuál elegir? ¡Usa el Asistente Inteligente!
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Responde 3 preguntas rápidas y encuentra tu equipo ideal en
              segundos.
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar Asistente
          </button>
        )}
      </div>

      {/* Panel de Opciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Pregunta 1: Presupuesto */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-green-500" /> Rango de
            Precio
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Económico", value: 700 },
              { label: "Medio", value: 1500 },
              { label: "Premium", value: null },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => handlePriceChange(opt.value)}
                className={`px-2 py-2 text-xs font-medium rounded-xl border transition-all ${
                  (opt.value === null && currentFilters.maxPrice === null) ||
                  (opt.value !== null && currentFilters.maxPrice === opt.value)
                    ? "bg-blue-600 border-blue-600 text-white font-semibold shadow-sm"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {opt.label} {opt.value ? `(≤ S/${opt.value})` : "(Cualquiera)"}
              </button>
            ))}
          </div>
        </div>

        {/* Pregunta 2: Uso Principal */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-500" /> ¿Para qué lo usarás?
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Básico (Redes/Llamadas)", value: "basico" },
              { label: "Trabajo / Fotos", value: "potente" },
              { label: "Gaming / Alto Rendimiento", value: "gaming" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleUsageChange(opt.value as any)}
                className={`px-2 py-2 text-xs font-medium rounded-xl border transition-all ${
                  currentFilters.usage === opt.value
                    ? "bg-purple-600 border-purple-600 text-white font-semibold shadow-sm"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
                title={opt.label}
              >
                {opt.value === "basico"
                  ? "Básico"
                  : opt.value === "potente"
                    ? "Potente"
                    : "Gaming"}
              </button>
            ))}
          </div>
        </div>

        {/* Pregunta 3: Red / Conectividad */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-blue-500" /> Red Requerida
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Solo 5G", value: true },
              { label: "4G o más", value: false },
              { label: "Cualquiera", value: null },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => handleWifiChange(opt.value)}
                className={`px-2 py-2 text-xs font-medium rounded-xl border transition-all ${
                  currentFilters.requires5G === opt.value
                    ? "bg-pink-600 border-pink-600 text-white font-semibold shadow-sm"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
