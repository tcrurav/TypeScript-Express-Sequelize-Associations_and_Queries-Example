const KEY = 'bicycle-shop-session'
export const SESSION_EVENT = 'bicycle-shop-session-change'

export interface Session {
    token: string
    username: string
    expiresAt: number
}

export function getSession(): Session | null {
    try {
        const session = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as Session | null
        if (session &&
            typeof session.token === 'string' &&
            typeof session.username === 'string' &&
            session.expiresAt > Date.now())
            return session
    } catch { /* Ignore invalid or unavailable browser storage. */ }
    return null
}

export function saveSession(session: Session) {
    sessionStorage.setItem(KEY, JSON.stringify(session))
    window.dispatchEvent(new Event(SESSION_EVENT))
}

export function clearSession() {
    sessionStorage.removeItem(KEY)
    window.dispatchEvent(new Event(SESSION_EVENT))
}
