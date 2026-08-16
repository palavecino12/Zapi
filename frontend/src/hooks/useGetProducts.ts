import { useState, useEffect } from "react"
import { getProducts } from "../services/productServices"
import type { Product } from "../types/productType"

export const useGetProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setError(null)

            try {
                const data = await getProducts()
                setProducts(data)
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Lo sentimos, tuvimos un problema al traer los productos'
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return { products, loading, error }
}