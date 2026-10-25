import { apiFetch } from '../../../services/api'
import { saveSession } from '../../../services/session'
import type { AuthCredentials, AuthResponse } from '../types/auth'

async function authenticate(action: 'login' | 'register', { username, password }: AuthCredentials) {

    const bytes = new TextEncoder().encode(`${username.trim()}:${password}`)
    const credentials = btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''))
    const result = await apiFetch<AuthResponse>(`/auth/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${credentials}` },
    })

    if (!result.token || !Number.isFinite(result.expiresIn) || result.expiresIn <= 0) {
        throw new Error('The server did not return a valid session.');
    }
    saveSession({ token: result.token, username: username.trim(), expiresAt: Date.now() + result.expiresIn * 1000 })
    
    return result
}

export const authService = {
    login(credentials: AuthCredentials) {
        return authenticate('login', credentials)
    },
    register(credentials: AuthCredentials) {
        return authenticate('register', credentials)
    },
}
