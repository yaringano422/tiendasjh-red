import { useStore } from "../context/StoreContext";
import { X, GitCompare, Wifi, Cpu, HardDrive, DollarSign } from "lucide-react";
import { getPhoneImage } from "../utils/phoneImages";

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompareDrawer({ isOpen, onClose }: CompareDrawerProps) {
  const { compareList, removeFromCompare, clearCompare } = useStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed left-0 top-0 h-full w-full max-w-4xl bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold">
              Comparar Productos ({compareList.length}/4)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {compareList.length === 0 ? (
            <div className="text-center py-12">
              <GitCompare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                No has agregado productos para comparar
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Puedes agregar hasta 4 productos
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 bg-gray-50 border font-semibold">
                      Característica
                    </th>
                    {compareList.map((phone) => {
                      const rawImages = phone.images as
                        | string
                        | string[]
                        | undefined;

                      const imagesArray: string[] = Array.isArray(rawImages)
                        ? rawImages
                        : typeof rawImages === "string" &&
                            rawImages.trim() !== ""
                          ? rawImages
                              .split(",")
                              .map((img: string) => img.trim())
                          : [];

                      const displayImage =
                        imagesArray.length > 0
                          ? imagesArray[0]
                          : getPhoneImage(phone.brand);

                      return (
                        <th
                          key={phone.id}
                          className="p-3 bg-gray-50 border min-w-[200px]"
                        >
                          <div className="relative">
                            <button
                              onClick={() => removeFromCompare(phone.id)}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <img
                              src={displayImage}
                              alt={phone.fullName}
                              className="w-20 h-20 object-cover mx-auto rounded-lg mb-2"
                            />
                            <div className="text-sm font-semibold">
                              {phone.fullName}
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* El resto de tu código de filas de la tabla se mantiene exactamente igual */}
                  <tr>
                    <td className="p-3 border font-medium bg-gray-50">Marca</td>
                    {compareList.map((phone) => (
                      <td key={phone.id} className="p-3 border text-center">
                        {phone.brand}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4" />
                        Conectividad
                      </div>
                    </td>
                    {compareList.map((phone) => (
                      <td key={phone.id} className="p-3 border text-center">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            phone.connectivity === "5G"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {phone.connectivity}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        RAM
                      </div>
                    </td>
                    {compareList.map((phone) => (
                      <td key={phone.id} className="p-3 border text-center">
                        {phone.ram}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium bg-gray-50">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4" />
                        Almacenamiento
                      </div>
                    </td>
                    {compareList.map((phone) => (
                      <td key={phone.id} className="p-3 border text-center">
                        {phone.storage}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium bg-gray-50">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Precio
                      </div>
                    </td>
                    {compareList.map((phone) => (
                      <td key={phone.id} className="p-3 border text-center">
                        <span className="text-xl font-bold text-blue-600">
                          S/{phone.price.toFixed(2)}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {compareList.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <button
              onClick={clearCompare}
              className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Limpiar Comparación
            </button>
          </div>
        )}
      </div>
    </>
  );
}
