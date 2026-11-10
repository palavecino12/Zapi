import { useState } from "react"
import type { updateProductDTO } from "../types/productType"
import { updateProduct } from "../services/productServices"

export const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const editProduct = async (code: string, product: updateProductDTO) => {
        setLoading(true)
        setError(null)

        try {
            const updatedProduct = await updateProduct(code, product)
            return updatedProduct
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Lo sentimos, tuvimos un problema al editar el producto'
            setError(message)
            return null
        } finally {
            setLoading(false)
        }
    }
    return { editProduct, loading, error }
}