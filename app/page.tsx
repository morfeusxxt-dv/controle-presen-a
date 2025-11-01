'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

type FormData = {
  nome: string;
  email: string;
  telefone: string;
};

export default function Home() {
  // State for form data and submission status
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  
  // Carregar URL atual e dados salvos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      
      // Carregar dados do localStorage
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
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    
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
        throw new Error('Erro ao registrar presença');
      }
      
      await response.json();
      
      // Limpar o formulário e mostrar mensagem de sucesso
      setFormData({ nome: '', email: '', telefone: '' });
      setIsSuccess(true);
      
      // Limpar a mensagem de sucesso após 5 segundos
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
      
    } catch (error) {
      console.error('Erro ao registrar presença:', error);
      alert('Erro ao registrar presença. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Controle de Presença</h1>
        <p className="text-gray-600">Registro de participantes para cursos e eventos</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulário de Registro */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Registrar Presença</h2>
          
          {isSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Presença registrada com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(00) 00000-0000"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {isSubmitting ? 'Registrando...' : 'Confirmar Presença'}
            </button>
          </form>
        </div>

        {/* QR Code Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Acesso Rápido</h2>
            <p className="text-sm text-gray-600 mb-3">Escaneie o QR Code para acessar esta página:</p>
            <div className="flex justify-center p-4 bg-white border border-gray-200 rounded-md">
              <QRCode 
                value={currentUrl} 
                size={150}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="mt-3 text-xs text-gray-500 text-center">Ou compartilhe o link: <span className="font-mono text-blue-500">{currentUrl}</span></p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Controle de Presença - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
