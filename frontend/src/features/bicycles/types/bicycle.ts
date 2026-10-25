export interface Bicycle {
    id: number
    brand: string
    brandId: number
    model: string
    description: string | null
    price: number | string
    stock: number
    createdAt?: string
    updatedAt?: string
}
export interface BicyclePayload {
    brandId: number
    model: string
    description: string | null
    price: number
    stock: number
}
