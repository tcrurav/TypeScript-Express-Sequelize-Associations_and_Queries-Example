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
        if (!username.trim() || !password) return setError('Enter your username and password.')
        if (username.includes(':') || password.includes(':')) return setError('The server does not allow the : character in usernames or passwords.')
        if (register && password !== confirmation) return setError('Passwords do not match.')
        submitting.current = true
        setPending(true)
        try {
            if (register) await authService.register({ username, password })
            else await authService.login({ username, password })
        } catch (cause) {
            setError(cause instanceof TypeError ? 'Could not connect to the server. Check that the backend is running.' : cause instanceof Error ? cause.message : 'Could not complete the request.')
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
                <h1 id="auth-title" className="text-3xl font-bold">{register ? 'Create your account' : 'Welcome back'}</h1>
                <p className="mt-3 mb-8 text-slate-500">{register ? 'Sign up to access the bicycle shop.' : 'Sign in to manage your bicycles.'}</p>
                <form onSubmit={submit} className="space-y-5" aria-busy={pending}>
                    <div>
                        <label htmlFor="username" className="mb-2 block text-sm font-medium">Username</label>
                        <input id="username" name="username" autoComplete="username" required value={username} onChange={event => setUsername(event.target.value)} disabled={pending} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
                        <input id="password" name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} required value={password} onChange={event => setPassword(event.target.value)} disabled={pending} className={inputClass} />
                    </div>
                    {register && <div>
                        <label htmlFor="confirmation" className="mb-2 block text-sm font-medium">Confirm password</label>
                        <input id="confirmation" name="confirmation" type="password" autoComplete="new-password" required value={confirmation} onChange={event => setConfirmation(event.target.value)} disabled={pending} className={inputClass} />
                    </div>}
                    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                    <button type="submit" disabled={pending} className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-60">
                        {pending ? 'Connecting…' : register ? 'Create account' : 'Sign in'}
                    </button>
                </form>
                <p className="mt-7 text-center text-sm text-slate-600">
                    {register ? 'Already have an account? ' : 'Don’t have an account yet? '}
                    <button type="button" disabled={pending} onClick={() => { setRegister(!register); setPassword(''); setConfirmation(''); setError('') }} className="font-semibold text-emerald-700 underline underline-offset-4 disabled:opacity-60">
                        {register ? 'Sign in' : 'Sign up'}
                    </button>
                </p>
            </section>
        </main>
    )
}
