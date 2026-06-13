'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const sections = [
  { name: 'Publicidad', image: 'voces.png', href: '/dashboard/publicidades', color: 'from-pink-500 to-rose-500' },
  { name: 'Vendedores', image: 'bebe-user.png', href: '/dashboard/vendedores', color: 'from-blue-500 to-cyan-500' },
  { name: 'Clientes', image: 'company.png', href: '/dashboard/clientes', color: 'from-green-500 to-emerald-500' },
  { name: 'Servicios', image: 'finanzas.png', href: '/dashboard/servicios', color: 'from-orange-500 to-amber-500' },
];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Logout error', err);
      }
    }
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/images/ic_launcher.png" alt="USA ALL BENEFITS GROUP PANEL" width={36} height={36} className="rounded-lg" />
            <span className="text-xl font-bold text-slate-900">USA ALL BENEFITS GROUP PANEL</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Panel de Administración</h2>
          <p className="text-slate-500 mt-2">Gestiona las diferentes áreas de la plataforma</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="group bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center gap-4 hover:shadow-xl hover:border-transparent transition-all"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <Image
                  src={`/images/${section.image}`}
                  alt={section.name}
                  width={48}
                  height={48}
                  className="brightness-0 invert"
                />
              </div>
              <span className="text-lg font-semibold text-slate-900">{section.name}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}