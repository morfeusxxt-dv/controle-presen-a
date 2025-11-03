import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'; // Importando ícones Lucide

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">PC</span>
              </div>
              <span className="text-xl font-bold text-white">Presença Cursos</span>
            </Link>
            <p className="text-sm text-gray-400">
              Sistema de controle de presença para cursos e eventos, simplificando o registro e a gestão.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Painel Admin
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidade" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Presença Cursos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}