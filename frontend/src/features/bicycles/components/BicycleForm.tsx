import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import type { Bicycle, BicyclePayload } from '../types/bicycle'
import BicycleFormFields from './BicycleFormFields'
import type { BicycleFormValues } from './BicycleFormFields'
import { useBrands } from '../../brands/hooks/useBrands'
import { bicycleImageUrl } from '../../../services/api'

interface BicycleFormProps {
    bicycle: Bicycle | null
    onSave: (payload: BicyclePayload) => Promise<void>
    onCancel: () => void
    onSavingChange: (saving: boolean) => void
}

function BicycleForm({ bicycle, onSave, onCancel, onSavingChange }: BicycleFormProps) {
    const { brands, loading, error: brandsError, reload } = useBrands()
    const [values, setValues] = useState<BicycleFormValues>(() => ({
        brandId: bicycle ? String(bicycle.brandId) : '',
        model: bicycle?.model ?? '',
        description: bicycle?.description ?? '',
        price: bicycle ? String(bicycle.price) : '',
        stock: String(bicycle?.stock ?? 0),
    }))
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const submitting = useRef(false)
    const imageId = useId()
    const [image, setImage] = useState<File | undefined>()
    const [preview, setPreview] = useState<string | undefined>()

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview) }
    }, [preview])

    const imageUrl = image ? preview : bicycle?.filename ? bicycleImageUrl(bicycle.filename) : undefined

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitting.current) return

        const payload: BicyclePayload = {
            image,
            brandId: Number(values.brandId),
            model: values.model.trim(),
            description: values.description.trim() || null,
            price: Number(values.price),
            stock: Number(values.stock),
        }

        if (loading || brandsError || !brands.some(brand => brand.id === payload.brandId) || !payload.model || !values.price.trim() || !values.stock.trim()
            || !Number.isFinite(payload.price) || payload.price < 0 || payload.price > 99999999.99
            || !Number.isInteger(payload.stock) || payload.stock < 0 || payload.stock > 4294967295) {
            setError('Check the brand, model, price, and stock.')
            return
        }

        submitting.current = true
        setSaving(true)
        onSavingChange(true)
        setError(null)
        try {
            await onSave(payload)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Could not save the bicycle. Please try again.')
        } finally {
            submitting.current = false
            setSaving(false)
            onSavingChange(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" aria-busy={saving}>
            {loading && <p role="status">Loading brands...</p>}
            {brandsError && <div><p role="alert" className="text-red-600">{brandsError}</p><Button type="button" onClick={() => void reload()} variant="secondary" className="rounded px-3 py-2">Reload brands</Button></div>}
            {!loading && !brandsError && brands.length === 0 && <p role="status">No brands available. Create one in the Brands section before saving a bicycle.</p>}
            <BicycleFormFields values={values} brands={brands} disabled={saving || loading || !!brandsError || brands.length === 0}
                onChange={(field, value) => setValues((previous) => ({ ...previous, [field]: value }))} />
            <div className="space-y-2">
                <label htmlFor={imageId} className="block font-medium">Bicycle image</label>
                {imageUrl && <img src={imageUrl} alt="Bicycle preview" className="h-40 w-full rounded border border-gray-200 object-contain" />}
                <input id={imageId} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                    disabled={saving} className="block w-full text-sm"
                    aria-describedby={`${imageId}-help`}
                    onChange={(event) => {
                        const file = event.target.files?.[0]
                        if (file && (!['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'].includes(file.type) || file.size > 5 * 1024 * 1024)) {
                            setError('Choose a JPEG, PNG, WebP, GIF or AVIF image up to 5 MB.')
                            event.target.value = ''
                            setImage(undefined)
                            setPreview(undefined)
                            return
                        }
                        setError(null)
                        setImage(file)
                        setPreview(file ? URL.createObjectURL(file) : undefined)
                    }} />
                <p id={`${imageId}-help`} className="text-sm text-gray-600">
                    JPEG, PNG, WebP, GIF or AVIF. Maximum 5 MB.
                    {bicycle && ' Leave empty to keep the current image.'}
                </p>
            </div>
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" disabled={saving} onClick={onCancel}
                    className="rounded px-4 py-2 disabled:opacity-50">Cancel</Button>
                <Button type="submit" disabled={saving || loading || !!brandsError || brands.length === 0} className="rounded px-4 py-2 disabled:opacity-50">
                    {saving ? 'Saving...' : bicycle ? 'Save changes' : 'Create bicycle'}
                </Button>
            </div>
        </form>
    )
}

export default BicycleForm
