import type { Bicycle } from '../types/bicycle'
import BicycleRow from './BicycleRow'

interface BicycleListProps {
    bicycles: Bicycle[]
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

function BicycleList({ bicycles, onEdit, onDelete}: BicycleListProps) {
    return (
        <div className="lg:overflow-hidden lg:rounded-lg lg:bg-white lg:shadow">
            <div aria-hidden="true"
                className={`hidden gap-4 bg-gray-800 p-4 font-semibold text-white lg:grid ${
                    onEdit || onDelete ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
                }`}>
                <span>Brand</span>
                <span>Model</span>
                <span>Price</span>
                <span>Stock</span>
                {(onEdit || onDelete) && <span>Actions</span>}
            </div>
            <ul aria-label="Bicycle list" className="grid min-w-0 gap-4 lg:gap-0">
                {bicycles.map((bicycle) => (
                    <BicycleRow key={bicycle.id} bicycle={bicycle}
                        onEdit={onEdit} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    )
}
export default BicycleList
