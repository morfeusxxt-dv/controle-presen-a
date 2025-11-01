'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">PC</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Presença Cursos</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Início
          </Link>
          
          {session ? (
            <>
              <Link 
                href="/admin" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/admin') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Painel Admin
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <Link 
              href="/auth/signin" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Entrar
            </Link>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button className="md:hidden text-gray-600 hover:text-gray-800">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
