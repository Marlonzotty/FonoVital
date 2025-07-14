import {
  Ear,
  CheckCircle,
  Truck,
  Store,
  Lock,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#213547] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Coluna 1 */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
            <Ear size={20} className="text-green-400" />
            <span>Fonovital</span>
          </h3>
          <p className="text-sm mb-4">
            Devolvendo a qualidade de vida através da audição.
          </p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-400" />
              <span>Garantia 3 meses</span>
            </li>
            <li className="flex items-center space-x-2">
              <Truck size={16} className="text-green-400" />
              <span>Envio em 24h</span>
            </li>
            <li className="flex items-center space-x-2">
              <Store size={16} className="text-green-400" />
              <span>Mercado Livre</span>
            </li>
            <li className="flex items-center space-x-2">
              <Lock size={16} className="text-green-400" />
              <span>Site Seguro SSL</span>
            </li>
          </ul>
        </div>

        {/* Coluna 2 */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Produtos</h3>
          <ul className="text-sm space-y-1">
            <li>Voxton CIC</li>
            <li>Voxcharge CIC</li>
            <li>Vitalvoice CIC</li>
          </ul>
        </div>

        {/* Coluna 3 */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Contato</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center space-x-2">
              <Phone size={16} className="text-green-400" />
              <span>(32) 99906-9763 </span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} className="text-green-400" />
              <span>fonovitaloficial@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={16} className="text-green-400" />
              <span>São João del Rei, MG</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} FonoVital. Site desenvolvido por Zotty Software.
      </div>
    </footer>
  );
}
