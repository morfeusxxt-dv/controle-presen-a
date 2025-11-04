import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic'; // Importando dynamic

// Importar ToastProvider dinamicamente com SSR desabilitado
const DynamicToastProvider = dynamic(() => import('@/components/ToastProvider'), { ssr: false });

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Controle de Presença - Cursos e Eventos',
  description: 'Sistema de controle de presença para cursos e eventos',
  keywords: ['presença', 'cursos', 'eventos', 'registro', 'check-in'],
  authors: [{ name: 'Sua Empresa' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
        <Providers>
          <DynamicToastProvider /> {/* Usando o ToastProvider dinâmico aqui */}
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}