import { BrandFilter } from "../types/phones";
import { Search } from "lucide-react";

interface FilterBarProps {
  selectedBrand: BrandFilter;
  onBrandChange: (brand: BrandFilter) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const brands: BrandFilter[] = [
  "Todos",
  "Samsung",
  "Xiaomi/Poco",
  "Honor",
  "ZTE",
  "Motorola",
  "Infinix",
  "Tablets",
  "Básicos",
];

export function FilterBar({
  selectedBrand,
  onBrandChange,
  searchTerm,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por modelo..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Filtrar por marca:
        </h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => onBrandChange(brand)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedBrand === brand
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
