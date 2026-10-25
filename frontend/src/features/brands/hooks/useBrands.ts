import { useCallback, useEffect, useState } from 'react'
import { brandService } from '../services/brandService'
import type { Brand } from '../services/brandService'

export function useBrands() {
    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const reload = useCallback(async () => {
        setLoading(true)
        setError('')
        try { setBrands(await brandService.getAll()) }
        catch { setError('No se pudieron cargar las marcas.') }
        finally { setLoading(false) }
    }, [])
    useEffect(() => {
        let active = true
        void brandService.getAll().then(data => {
            if (active) setBrands(data)
        }).catch(() => {
            if (active) setError('No se pudieron cargar las marcas.')
        }).finally(() => {
            if (active) setLoading(false)
        })
        return () => { active = false }
    }, [])
    return { brands, loading, error, reload }
}
