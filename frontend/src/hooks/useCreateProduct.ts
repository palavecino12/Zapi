import { useState } from "react"
import { createProduct } from "../services/productServices"
import type { Product, CreateProductDTO } from "../types/productType"

export const useCreateProduct = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const addProduct = async (productData: CreateProductDTO): Promise<Product | null> => {
        setLoading(true)
        setError(null)

        try {
            const newProduct = await createProduct(productData)
            return newProduct
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Lo sentimos, tuvimos un problema al crear el producto'
            setError(message)
            return null
        } finally {
            setLoading(false)
        }
    }

    return { addProduct, loading, error }
}