import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Check,
  Smartphone,
  ShieldCheck,
  Zap,
  Camera,
  Eye,
} from "lucide-react";

export interface SmartFilters {
  maxPrice: number | null;
  profile: string;
  minRam: number | null;
  requires5G: boolean | null;
  minBattery: number | null;
  screenType: string; // 'todos' | 'amoled_oled'
  usage: string | null;
}

interface SmartFinderProps {
  currentFilters: SmartFilters;
  onFilterChange: (filters: SmartFilters) => void;
}

export function SmartFinder({
  currentFilters,
  onFilterChange,
}: SmartFinderProps) {
  const [step, setStep] = useState<number>(1);

  const profiles = [
    {
      id: "whatsapp",
      label: "Solo WhatsApp y Llamadas",
      icon: Smartphone,
      desc: "Rendimiento diario básico, llamadas limpias y redes sociales ligeras.",
    },
    {
      id: "estudiante",
      label: "Estudiante / Oficina",
      icon: ShieldCheck,
      desc: "Ideal para multitarea, documentos, clases en línea y excelente autonomía.",
    },
    {
      id: "gamer",
      label: "Gamer Exigente",
      icon: Zap,
      desc: "Procesador potente, alta tasa de refresco en pantalla y optimización gráfica.",
    },
    {
      id: "fotografo",
      label: "Fotografía y Redes (TikTok)",
      icon: Camera,
      desc: "Cámaras con buen procesamiento HDR, estabilización o pantallas nítidas.",
    },
    {
      id: "premium",
      label: "Lo Mejor de lo Mejor (Premium)",
      icon: Eye,
      desc: "Máxima velocidad, pantallas AMOLED fluidas y características top de gama.",
    },
  ];

  const handleProfileSelect = (profileId: string) => {
    let minRam = null;
    let screenType = "todos";
    let minBattery = null;

    switch (profileId) {
      case "whatsapp":
        minRam = 0;
        break;
      case "estudiante":
        minRam = 4;
        minBattery = 5000;
        break;
      case "gamer":
        minRam = 8;
        screenType = "todos";
        break;
      case "fotografo":
        minRam = 6;
        screenType = "amoled_oled";
        break;
      case "premium":
        minRam = 8;
        screenType = "amoled_oled";
        break;
    }

    onFilterChange({
      ...currentFilters,
      profile: profileId,
      usage: profileId,
      minRam,
      screenType,
      minBattery,
    });
    setStep(2);
  };

  const handlePriceSelect = (maxPrice: number | null) => {
    onFilterChange({ ...currentFilters, maxPrice });
    setStep(3);
  };

  const handleConnectivitySelect = (requires5G: boolean | null) => {
    onFilterChange({ ...currentFilters, requires5G });
    setStep(4);
  };

  const resetFinder = () => {
    onFilterChange({
      maxPrice: null,
      profile: "todos",
      minRam: null,
      requires5G: null,
      minBattery: null,
      screenType: "todos",
      usage: "todos",
    });
    setStep(1);
  };

  const isFilterActive =
    currentFilters.profile !== "todos" ||
    currentFilters.maxPrice !== null ||
    currentFilters.requires5G !== null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden mb-8 transition-all">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-5 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 animate-pulse">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              Asistente de Compra Inteligente
            </h3>
            <p className="text-xs text-indigo-200">
              Encuentra tu smartphone ideal analizando métricas de hardware
            </p>
          </div>
        </div>

        {isFilterActive && (
          <button
            onClick={resetFinder}
            className="flex items-center gap-2 text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all border border-white/10"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reiniciar Filtros
          </button>
        )}
      </div>

      <div className="p-6 bg-slate-50/50">
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => step > s && setStep(s)}
              disabled={step < s}
              className={`h-2 rounded-full transition-all flex-1 min-w-[40px] ${
                step === s
                  ? "bg-indigo-600 w-8"
                  : step > s
                    ? "bg-emerald-500 cursor-pointer"
                    : "bg-slate-200"
              }`}
            />
          ))}
          <span className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-wider">
            {step === 4 ? "Listo" : `Paso ${step} de 3`}
          </span>
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
              ¿Cómo describirías tu perfil o el uso principal del equipo?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profiles.map((p) => {
                const Icon = p.icon;
                const isSelected = currentFilters.profile === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleProfileSelect(p.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex gap-3 items-start group ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20"
                        : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mt-0.5 transition-colors ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600"}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        {p.label}
                        {isSelected && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
              ¿Cuál es tu rango de presupuesto estimado?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Hasta S/ 500",
                  val: 500,
                  desc: "Gama de entrada / Esenciales",
                },
                {
                  label: "Hasta S/ 900",
                  val: 900,
                  desc: "Calidad-Precio equilibrada",
                },
                {
                  label: "Hasta S/ 1600",
                  val: 1600,
                  desc: "Gama media-alta avanzada",
                },
                {
                  label: "Ver todos los precios",
                  val: null,
                  desc: "Sin límites",
                },
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePriceSelect(p.val)}
                  className={`p-4 rounded-xl text-center border transition-all ${
                    currentFilters.maxPrice === p.val
                      ? "bg-indigo-50 border-indigo-500 font-bold text-indigo-900"
                      : "bg-white border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <p className="text-base font-bold text-slate-900">
                    {p.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
              ¿Es importante la conectividad de última generación 5G?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Sí, requiero Red 5G",
                  val: true,
                  desc: "Máxima velocidad urbana.",
                },
                {
                  label: "No, con 4G estoy bien",
                  val: false,
                  desc: "Suficiente para todo uso estándar.",
                },
                {
                  label: "Cualquiera me sirve",
                  val: null,
                  desc: "Priorizar otras especificaciones.",
                },
              ].map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => handleConnectivitySelect(c.val)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    currentFilters.requires5G === c.val
                      ? "bg-indigo-50 border-indigo-500 font-bold"
                      : "bg-white border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <p className="text-sm font-bold text-slate-900">{c.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fadeIn">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                Asistente Activo: Filtrando stock en tiempo real
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mostrando celulares que cumplen con: Perfil:{" "}
                <span className="font-semibold text-indigo-700">
                  "{currentFilters.profile}"
                </span>
                {currentFilters.maxPrice
                  ? ` • Menor a S/ ${currentFilters.maxPrice}`
                  : " • Cualquier precio"}
                {currentFilters.requires5G !== null
                  ? ` • Red: ${currentFilters.requires5G ? "Solo 5G" : "Solo 4G"}`
                  : ""}
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-xs bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-all"
            >
              Ajustar respuestas
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
