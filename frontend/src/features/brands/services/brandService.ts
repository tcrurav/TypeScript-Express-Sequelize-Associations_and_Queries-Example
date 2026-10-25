import { apiFetch } from '../../../services/api'

export interface Brand { id: number; name: string }

export const brandService = {

    getAll: () => apiFetch<Brand[]>('/brands', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (name: string) => apiFetch<Brand>('/brands', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ name })
    }),

    update: (id: number, name: string) => apiFetch<Brand>(`/brands/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ name })
    }),

    remove: (id: number) => apiFetch<void>(`/brands/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}
