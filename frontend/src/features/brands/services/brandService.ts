import { apiFetch } from '../../../services/api'

export interface Brand { id: number; name: string }

export const brandService = {
    getAll: () => apiFetch<Brand[]>('/brands'),
    create: (name: string) => apiFetch<Brand>('/brands', { 
        method: 'POST', 
        body: JSON.stringify({ name }) }),
    update: (id: number, name: string) => apiFetch<Brand>(`/brands/${id}`, { 
        method: 'PUT', 
        body: JSON.stringify({ name }) }),
    remove: (id: number) => apiFetch<void>(`/brands/${id}`, { method: 'DELETE' }),
}
