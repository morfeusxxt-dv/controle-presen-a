'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard, Home as HomeIcon, LogIn } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path || (path === '/admin' && pathname.startsWith('/admin'));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">PC</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Presença Cursos</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
              isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <HomeIcon size={18} />
            <span>Início</span>
          </Link>
          
          {session ? (
            <>
              <Link 
                href="/admin" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActive('/admin') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard size={18} />
                <span>Painel Admin</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn btn-danger flex items-center space-x-1"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <Link 
              href="/auth/signin" 
              className="btn btn-primary flex items-center space-x-1"
            >
              <LogIn size={18} />
              <span>Entrar</span>
            </Link>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-2">
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
              isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={toggleMobileMenu}
          >
            <HomeIcon size={20} />
            <span>Início</span>
          </Link>
          
          {session ? (
            <>
              <Link 
                href="/admin" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                  isActive('/admin') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={toggleMobileMenu}
              >
                <LayoutDashboard size={20} />
                <span>Painel Admin</span>
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  toggleMobileMenu();
                }}
                className="btn btn-danger w-full flex items-center space-x-2"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <Link 
              href="/auth/signin" 
              className="btn btn-primary w-full flex items-center space-x-2"
              onClick={toggleMobileMenu}
            >
              <LogIn size={20} />
              <span>Entrar</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}