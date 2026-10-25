import { apiFetch } from '../../../services/api'
import { brandService } from '../../brands/services/brandService'

import type {
    Bicycle,
    BicyclePayload,
} from '../types/bicycle'

export const bicycleService = {
    getAll: async () => {
        const [bicycles, brands] = await Promise.all([apiFetch<Bicycle[]>('/bicycles'), brandService.getAll()])
        const names = new Map(brands.map(brand => [brand.id, brand.name]))
        return bicycles.map(bicycle => ({ ...bicycle, brand: names.get(bicycle.brandId) ?? `Marca #${bicycle.brandId}` }))
    },
    getById: (id: number) => apiFetch<Bicycle>(`/bicycles/${id}`),
    create: (payload: BicyclePayload) => apiFetch<Bicycle>('/bicycles', {
        method: 'POST',
        body: JSON.stringify(payload),
    }),
    update: (id: number, payload: BicyclePayload) => apiFetch<Bicycle>(`/bicycles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    }),
    remove: (id: number) => apiFetch<void>(`/bicycles/${id}`, {
        method: 'DELETE',
    }),
}
