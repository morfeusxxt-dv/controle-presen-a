// app/layout.tsx
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Melhora o carregamento de fontes
  variable: '--font-inter', // Permite usar a fonte como variável CSS
});

export const metadata: Metadata = {
  title: 'Controle de Presença - Cursos e Eventos',
  description: 'Sistema de controle de presença para cursos e eventos. Registre sua presença de forma rápida e fácil.',
  keywords: ['presença', 'cursos', 'eventos', 'registro', 'check-in'],
  authors: [{ name: 'Sua Empresa' }],
  themeColor: '#2563EB',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  robots: 'index, follow',
};

interface RootLayoutProps {
  children: React.ReactNode;
  session?: Session | null;
}

export default function RootLayout({
  children,
  session,
}: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}