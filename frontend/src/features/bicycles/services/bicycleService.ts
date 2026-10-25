import { apiFetch } from '../../../services/api'
import { brandService } from '../../brands/services/brandService'

import type { Bicycle, BicyclePayload, } from '../types/bicycle'

export const bicycleService = {
    getAll: async () => {
        const [bicycles, brands] = await Promise.all([
            apiFetch<Bicycle[]>('/bicycles', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            brandService.getAll()]);

        const names = new Map(brands.map(brand => [brand.id, brand.name]))
        return bicycles.map(bicycle => ({ ...bicycle, brand: names.get(bicycle.brandId) }))
    },

    getById: (id: number) => apiFetch<Bicycle>(`/bicycles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: BicyclePayload) => apiFetch<Bicycle>('/bicycles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: BicyclePayload) => apiFetch<Bicycle>(`/bicycles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/bicycles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
