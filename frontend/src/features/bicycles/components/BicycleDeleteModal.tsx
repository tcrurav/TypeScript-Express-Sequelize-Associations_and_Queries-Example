import { useEffect, useId, useRef } from 'react'
import Button from '../../../components/ui/Button'
import type { Bicycle } from '../types/bicycle'

interface BicycleDeleteModalProps {
    bicycle: Bicycle
    deleting: boolean
    error: string | null
    onConfirm: () => void
    onClose: () => void
}

function BicycleDeleteModal({ bicycle, deleting, error, onConfirm, onClose }: BicycleDeleteModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleId = useId()
    const descriptionId = useId()

    useEffect(() => {
        const dialog = dialogRef.current
        dialog?.showModal()
        return () => dialog?.close()
    }, [])

    return (
        <dialog ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId}
            aria-busy={deleting}
            className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50"
            onCancel={(event) => {
                event.preventDefault()
                if (!deleting) onClose()
            }}>
            <h2 id={titleId} className="mb-4 text-xl font-bold">Delete bicycle</h2>
            <p id={descriptionId} className="mb-6">
                Do you want to delete the bicycle <strong>{bicycle.brand} {bicycle.model}</strong>?
                {' '}This action cannot be undone.
            </p>
            {deleting && <p role="status" className="mb-4">Deleting bicycle...</p>}
            {error && <p role="alert" className="mb-4 text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button autoFocus type="button" variant="secondary" disabled={deleting}
                    onClick={onClose} className="rounded px-4 py-2 disabled:opacity-50">
                    Cancel
                </Button>
                <Button type="button" variant="danger" disabled={deleting}
                    onClick={onConfirm} className="rounded px-4 py-2 disabled:opacity-50">
                    {deleting ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        </dialog>
    )
}

export default BicycleDeleteModal
