import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Controle de Presença - Cursos',
  description: 'Sistema de controle de presença para cursos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
