export interface Bicycle {
    id: number
    brand: string
    brandId: number
    model: string
    description: string | null
    price: number | string
    stock: number
    filename?: string | null
    createdAt?: string
    updatedAt?: string
}
export interface BicyclePayload {
    image?: File
    brandId: number
    model: string
    description: string | null
    price: number
    stock: number
}
