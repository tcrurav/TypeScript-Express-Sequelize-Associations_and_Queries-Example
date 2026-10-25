import { clearSession, getSession } from './session'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api')

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = new Headers(options.headers)

    const session = getSession()
    const authenticated = !headers.has('Authorization') && !!session
    if (authenticated) headers.set('Authorization', `Bearer ${session.token}`)

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers, })

    if (!response.ok) {
        if (response.status === 401 && authenticated) clearSession()
        const body = await response.json().catch(() => null)
        const message = typeof body?.message === 'string' ? body.message : null
        throw new Error(response.status === 401 ?
            'Incorrect username or password. Please sign in again.'
            : message || `Could not complete the request (${response.status}).`);
    }

    const text = await response.text();
    if (!text) return undefined as T;

    return JSON.parse(text) as T;
}
