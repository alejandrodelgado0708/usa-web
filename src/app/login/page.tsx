'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login');
      }

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#FF6B00] p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <Image
              src="/images/ic_launcher.png"
              alt="USA ALL BENEFITS GROUP PANEL"
              width={48}
              height={48}
              className="rounded-xl"
            />
            <span className="text-3xl font-bold text-white tracking-tight">USA ALL BENEFITS GROUP PANEL</span>
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Panel de Administración
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Gestiona clientes, vendedores, servicios y publicidad de USA ALL BENEFITS GROUP.
          </p>
        </div>

        
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image src="/images/ic_launcher.png" alt="USA ALL BENEFITS GROUP PANEL" width={40} height={40} className="rounded-xl" />
              <span className="text-2xl font-bold text-[#FF6B00]">USA ALL BENEFITS GROUP PANEL</span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Panel de Administración</h2>
            <p className="text-slate-500 mt-2">Accede con tus credenciales de administrador</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#FF6B00] hover:bg-[#E65A00] text-white font-bold text-lg rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
            >
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}