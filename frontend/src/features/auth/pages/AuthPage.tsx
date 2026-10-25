import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { authService } from '../services/authService'

export default function AuthPage() {
    const [register, setRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')
    const submitting = useRef(false)

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitting.current) return
        setError('')
        if (!username.trim() || !password) return setError('Introduce tu usuario y contraseña.')
        if (username.includes(':') || password.includes(':')) return setError('El servidor no admite el carácter : en el usuario ni en la contraseña.')
        if (register && password !== confirmation) return setError('Las contraseñas no coinciden.')
        submitting.current = true
        setPending(true)
        try {
            if (register) await authService.register({ username, password })
            else await authService.login({ username, password })
        } catch (cause) {
            setError(cause instanceof TypeError ? 'No se pudo conectar con el servidor. Comprueba que el backend está en marcha.' : cause instanceof Error ? cause.message : 'No se pudo completar la solicitud.')
        } finally {
            submitting.current = false
            setPending(false)
        }
    }

    const inputClass = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:opacity-60'
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12 text-slate-900">
            <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-10" aria-labelledby="auth-title">
                <p className="mb-8 text-sm font-bold tracking-widest text-emerald-700">BICYCLE SHOP</p>
                <h1 id="auth-title" className="text-3xl font-bold">{register ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}</h1>
                <p className="mt-3 mb-8 text-slate-500">{register ? 'Regístrate para acceder a la tienda de bicicletas.' : 'Inicia sesión para gestionar tus bicicletas.'}</p>
                <form onSubmit={submit} className="space-y-5" aria-busy={pending}>
                    <div>
                        <label htmlFor="username" className="mb-2 block text-sm font-medium">Usuario</label>
                        <input id="username" name="username" autoComplete="username" required value={username} onChange={event => setUsername(event.target.value)} disabled={pending} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium">Contraseña</label>
                        <input id="password" name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} required value={password} onChange={event => setPassword(event.target.value)} disabled={pending} className={inputClass} />
                    </div>
                    {register && <div>
                        <label htmlFor="confirmation" className="mb-2 block text-sm font-medium">Confirmar contraseña</label>
                        <input id="confirmation" name="confirmation" type="password" autoComplete="new-password" required value={confirmation} onChange={event => setConfirmation(event.target.value)} disabled={pending} className={inputClass} />
                    </div>}
                    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                    <button type="submit" disabled={pending} className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-60">
                        {pending ? 'Conectando…' : register ? 'Crear cuenta' : 'Iniciar sesión'}
                    </button>
                </form>
                <p className="mt-7 text-center text-sm text-slate-600">
                    {register ? '¿Ya tienes cuenta? ' : '¿Todavía no tienes cuenta? '}
                    <button type="button" disabled={pending} onClick={() => { setRegister(!register); setPassword(''); setConfirmation(''); setError('') }} className="font-semibold text-emerald-700 underline underline-offset-4 disabled:opacity-60">
                        {register ? 'Inicia sesión' : 'Regístrate'}
                    </button>
                </p>
            </section>
        </main>
    )
}
