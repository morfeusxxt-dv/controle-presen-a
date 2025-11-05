'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Importar dynamic
import { Loader2, CheckCircle, XCircle, ClipboardCopy } from 'lucide-react';
import { showSuccessToast, showErrorToast, showLoadingToast, dismissToast } from '@/utils/toast';

// Importar ClientQRCode dinamicamente com SSR desabilitado
const DynamicQRCode = dynamic(() => import('@/components/ClientQRCode'), { ssr: false });

type FormData = {
  nome: string;
  email: string;
  telefone: string;
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [isClient, setIsClient] = useState(false); // Novo estado para controlar se estamos no cliente
  
  useEffect(() => {
    setIsClient(true); // Define como true após a primeira renderização no cliente
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin);
      
      const savedData = localStorage.getItem('formData');
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, []);
  
  // Salvar dados no localStorage quando o formulário for alterado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.telefone) {
      showErrorToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    const toastId = showLoadingToast('Registrando presença...');
    
    try {
      const response = await fetch('/api/presencas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          data: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao registrar presença');
      }
      
      await response.json();
      
      // Limpar o formulário e mostrar mensagem de sucesso
      setFormData({ nome: '', email: '', telefone: '' });
      showSuccessToast('Presença registrada com sucesso!');
      
    } catch (error: any) {
      console.error('Erro ao registrar presença:', error);
      showErrorToast(error.message || 'Erro ao registrar presença. Por favor, tente novamente.');
    } finally {
      dismissToast(toastId);
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    showSuccessToast('Link copiado para a área de transferência!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header da página inicial (título específico desta página) */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          Controle de Presença
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Registre sua presença em nossos cursos e eventos de forma rápida e fácil
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Formulário de Registro */}
        <div className="card">
          <div className="card-header-gradient">
            <div className="card-header-content">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Registrar Presença
              </h2>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Digite seu nome completo"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                  Telefone/WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary w-full ${
                  isSubmitting 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5 text-white" />
                    Processando...
                  </>
                ) : (
                  'Confirmar Presença'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Seção QR Code */}
        <div className="space-y-6 sticky top-6">
          <div className="card">
            <div className="card-header-gradient">
              <div className="card-header-content">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </span>
                  Acesso Rápido
                </h2>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">Escaneie o QR Code abaixo para acessar esta página diretamente do seu celular:</p>
              
              <div className="flex justify-center p-4 bg-white border-2 border-dashed border-gray-200 rounded-xl mb-4">
                {isClient && currentUrl ? ( // Renderiza o QR code apenas se estiver no cliente e a URL disponível
                  <DynamicQRCode 
                    value={currentUrl} 
                    size={180}
                    level="H"
                    includeMargin={false}
                    fgColor="#1e40af"
                    bgColor="#ffffff"
                    imageSettings={{
                      src: '/favicon.ico',
                      height: 30,
                      width: 30,
                      excavate: true,
                    }}
                  />
                ) : (
                  // Placeholder para renderização no servidor e renderização inicial no cliente
                  <div className="w-[180px] h-[180px] flex items-center justify-center bg-gray-50 text-gray-400 text-sm rounded-md">
                    Carregando QR Code...
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Ou compartilhe o link:</p>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="flex-1 px-4 py-2 text-sm text-gray-700 bg-transparent border-0 focus:ring-0 focus:outline-none truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <ClipboardCopy size={18} className="mr-1" /> Copiar
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Como funciona?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Preencha o formulário ao lado com seus dados</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Clique em "Confirmar Presença"</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Pronto! Sua presença foi registrada com sucesso</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}