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
              href="https://wa.me/51960097010?text=Hola%2C%20estoy%20interesado%20en%20el%20celular."
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
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded-full text-red-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Dirección</h3>
              </div>
              <p className="text-slate-600 font-medium">Jr. Atahualpa 270</p>
              <p className="text-slate-500 text-sm mb-4">Huancayo, Perú</p>
            </div>

            {/* Botón de Cómo llegar */}
            <a
              href="https://www.google.com/maps/dir//TIENDAS+JHARED,+Atahualpa+270,+Huancayo+12001/@-12.070058,-75.203497,17z/data=!4m16!1m7!3m6!1s0x910ebf0489ddeb9b:0xfdecc7a692194c51!2sTIENDAS+JHARED!8m2!3d-12.070058!4d-75.203497!16s%2Fg%2F11msp6w_rb!4m7!1m0!1m5!1m1!1s0x910ebf0489ddeb9b:0xfdecc7a692194c51!2m2!1d-75.203497!2d-12.070058?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              Cómo llegar
            </a>
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
            <p className="text-slate-600">Sábados: 7am - 7pm</p>
          </div>

          {/* Redes Sociales */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Redes Sociales
                </h3>
              </div>
            </div>

            <div className="flex gap-3 items-center mt-6">
              <a
                href="https://web.facebook.com/profile.php?id=61576685224812"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold rounded-lg transition-colors"
              >
                Facebook
              </a>
              <span className="text-slate-300 font-light">|</span>
              <a
                href="https://www.instagram.com/jharedtiendas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 bg-pink-50 text-pink-600 hover:bg-pink-100 font-bold rounded-lg transition-colors"
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
              * Todos los precios incluyen garantía de 12 meses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
