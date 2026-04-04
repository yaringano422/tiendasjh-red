import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  CreditCard,
} from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contáctanos para Comprar</h2>
          <p className="text-blue-100 text-lg">
            Estamos listos para ayudarte a encontrar el celular perfecto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Teléfono */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Teléfono</h3>
            </div>
            <p className="text-slate-600 font-medium">+51 960 097 010</p>
            <p className="text-slate-600 font-medium">+51 999 011 030</p>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">WhatsApp</h3>
            </div>
            <a
              href="https://wa.me/51960097010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-semibold underline"
            >
              Enviar mensaje
            </a>
            <p className="text-sm text-slate-500 mt-2">Respuesta inmediata</p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Email</h3>
            </div>
            <a
              href="mailto:tiendasjhared@gmail.com"
              className="text-purple-600 hover:text-purple-700 font-semibold underline"
            >
              tiendasjhared@gmail.com
            </a>
            <p className="text-sm text-slate-500 mt-2">Respuesta en 24h</p>
          </div>

          {/* Dirección */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Dirección</h3>
            </div>
            <p className="text-slate-600">Jr. Atahualpa 270 </p>
            <p className="text-slate-500 text-sm">Huancayo, Perú</p>
          </div>

          {/* Horario */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Horario</h3>
            </div>
            <p className="text-slate-600">Lunes - Domingo: 7am - 8pm</p>
            <p className="text-slate-600">Sábados: 9am - 5pm</p>
          </div>

          {/* Redes Sociales */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Redes Sociales
              </h3>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Facebook
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="#"
                className="text-pink-600 hover:text-pink-700 font-semibold"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CreditCard className="w-7 h-7 text-indigo-600" />
              <h3 className="text-2xl font-bold text-slate-800">
                Métodos de Pago
              </h3>
            </div>
            <p className="text-slate-600 font-medium mb-4">
              Aceptamos: Efectivo, Transferencias Bancarias, Yape, Plin
            </p>
            <p className="text-sm text-slate-400">
              * Todos los precios incluyen garantía de 6 meses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
