import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Controle de Presença - Cursos',
  description: 'Sistema de controle de presença para cursos',
  viewport: 'width=device-width, initial-scale=1.0'
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
