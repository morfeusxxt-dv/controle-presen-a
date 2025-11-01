import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PC</span>
              </div>
              <span className="text-lg font-bold text-gray-800">Presença Cursos</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Sistema de controle de presença para cursos</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm">
            <Link href="/sobre" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contato
            </Link>
            <Link href="/privacidade" className="text-gray-600 hover:text-blue-600 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-gray-600 hover:text-blue-600 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Presença Cursos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
