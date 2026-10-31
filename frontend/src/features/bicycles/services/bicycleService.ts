import { apiFetch } from '../../../services/api'
import { brandService } from '../../brands/services/brandService'

import type { Bicycle, BicyclePayload, } from '../types/bicycle'

function toFormData(payload: BicyclePayload) {
    const form = new FormData()
    form.set('brandId', String(payload.brandId))
    form.set('model', payload.model)
    form.set('description', payload.description ?? '')
    form.set('price', String(payload.price))
    form.set('stock', String(payload.stock))
    if (payload.image) form.set('image', payload.image)
    return form
}

export const bicycleService = {
    getAll: async () => {
        const [bicycles, brands] = await Promise.all([
            apiFetch<Bicycle[]>('/bicycles', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            brandService.getAll()]);

        const names = new Map(brands.map(brand => [brand.id, brand.name]))
        return bicycles.map(bicycle => ({ ...bicycle, brand: names.get(bicycle.brandId) ?? 'Unknown brand' }))
    },

    getById: (id: number) => apiFetch<Bicycle>(`/bicycles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: BicyclePayload) => apiFetch<Bicycle>('/bicycles', {
        method: 'POST',
        body: toFormData(payload),
    }),

    update: (id: number, payload: BicyclePayload) => apiFetch<Bicycle>(`/bicycles/${id}`, {
        method: 'PUT',
        body: toFormData(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/bicycles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
