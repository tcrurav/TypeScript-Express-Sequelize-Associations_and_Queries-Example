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
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Could not save the bicycle.')
            throw error
        }
        await loadBicycles()
    }

    async function deleteBicycle(id: number) {
        try {
            setError(null)
            await bicycleService.remove(id)
            setBicycles(previous => previous.filter(bicycle => bicycle.id !== id))
            await loadBicycles()
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Could not delete the bicycle.')
            throw error
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
