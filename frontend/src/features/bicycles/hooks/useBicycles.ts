import { useEffect, useState } from 'react'
import type { Bicycle, BicyclePayload } from '../types/bicycle'
import { bicycleService } from '../services/bicycleService'

export function useBicycles() {
    const [bicycles, setBicycles] = useState<Bicycle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function loadBicycles() {
        try {
            setLoading(true)
            setError(null)
            const data = await bicycleService.getAll()
            setBicycles(data)
        }
        catch {
            setError('Could not load bicycles.')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => { void loadBicycles() }, [])

    async function saveBicycle(id: number | null, payload: BicyclePayload) {
        setError(null)

        try {
            if (id === null) {
                await bicycleService.create(payload)
            }
            else {
                await bicycleService.update(id, payload)
            }
        } catch {
            setError('Could not save the bicycle.')
            throw new Error('Could not save bicycle')
        }
        await loadBicycles()
    }

    async function deleteBicycle(id: number) {
        try {
            setError(null)
            await bicycleService.remove(id)
            await loadBicycles()
        } catch {
            setError('Could not delete the bicycle.')
        }
    }
    
    return {
        bicycles,
        loading,
        error,
        setError,
        loadBicycles,
        saveBicycle,
        deleteBicycle,
    }
}
