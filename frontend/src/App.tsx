import BicyclesPage from './features/bicycles/pages/BicyclesPage'
import BrandsPage from './features/brands/pages/BrandsPage'
import { useEffect, useState } from 'react'
import AuthPage from './features/auth/pages/AuthPage'
import { clearSession, getSession, SESSION_EVENT } from './services/session'

function App() {
  const [session, setSession] = useState(getSession)
  const [page, setPage] = useState<'bicycles' | 'brands'>('bicycles')
  useEffect(() => {
    const sync = () => setSession(getSession())
    window.addEventListener(SESSION_EVENT, sync)
    return () => window.removeEventListener(SESSION_EVENT, sync)
  }, [])
  useEffect(() => {
    if (!session) return
    const timeout = window.setTimeout(clearSession, Math.max(0, session.expiresAt - Date.now()))
    return () => window.clearTimeout(timeout)
  }, [session])
  if (!session) return <AuthPage />
  return <>
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
      <span className="font-semibold text-emerald-700">Bicycle Shop · {session.username}</span>
      <button type="button" onClick={clearSession} className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">Cerrar sesión</button>
    </header>
    <nav aria-label="Gestión de la tienda" className="mx-auto flex max-w-6xl gap-2 px-4 pt-6 sm:px-6">
      <button type="button" aria-current={page === 'bicycles' ? 'page' : undefined} onClick={() => setPage('bicycles')} className={`rounded px-4 py-2 ${page === 'bicycles' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Bicicletas</button>
      <button type="button" aria-current={page === 'brands' ? 'page' : undefined} onClick={() => setPage('brands')} className={`rounded px-4 py-2 ${page === 'brands' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Marcas</button>
    </nav>
    {page === 'bicycles' ? <BicyclesPage /> : <BrandsPage />}
  </>
}
export default App
