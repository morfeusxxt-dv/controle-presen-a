'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, Users, CheckCircle } from 'lucide-react'; // Importando ícones Lucide

type Presenca = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  data: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, today: 0 });
  const [latestPresencas, setLatestPresencas] = useState<Presenca[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, presencasRes] = await Promise.all([
        fetch('/api/presencas/stats'),
        fetch('/api/presencas?limit=5'), // Buscar as 5 últimas presenças
      ]);

      const statsData = await statsRes.json();
      const presencasData = await presencasRes.json();

      setStats(statsData);
      setLatestPresencas(presencasData);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{session?.user?.email}</span>
            <button
              onClick={() => {
                router.push('/api/auth/signout');
              }}
              className="btn btn-danger" // Usando a classe 'btn-danger'
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card"> {/* Usando a classe 'card' */}
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" /> {/* Ícone Lucide */}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total de Presenças</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.total}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link href="/admin/presencas" className="font-medium text-blue-600 hover:text-blue-500">
                    Ver todas
                  </Link>
                </div>
              </div>
            </div>

            <div className="card"> {/* Usando a classe 'card' */}
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <CalendarDays className="h-6 w-6 text-white" /> {/* Ícone Lucide */}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Presenças Hoje</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.today}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link href="/admin/presencas/hoje" className="font-medium text-blue-600 hover:text-blue-500">
                    Ver de hoje
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Últimas Presenças</h2>
              <Link 
                href="/admin/presencas/nova" 
                className="btn btn-primary" // Usando a classe 'btn-primary'
              >
                Adicionar Presença
              </Link>
            </div>
            <div className="card"> {/* Usando a classe 'card' */}
              <ul className="divide-y divide-gray-200">
                {latestPresencas.length > 0 ? (
                  latestPresencas.map((presenca) => (
                    <li key={presenca.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{presenca.nome}</p>
                        <p className="text-sm text-gray-500">{presenca.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(presenca.createdAt).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-6 py-8 text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma presença registrada ainda</h3>
                    <p className="mt-1 text-sm text-gray-500">Comece adicionando uma nova presença ou aguarde os registros.</p>
                    <div className="mt-6">
                      <Link 
                        href="/admin/presencas/nova" 
                        className="btn btn-primary" // Usando a classe 'btn-primary'
                      >
                        Adicionar Presença
                      </Link>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}