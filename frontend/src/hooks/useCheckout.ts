// payment/useCheckout.ts
import { useState } from 'react'
import { createCheckout } from '../services/saleServices'
import type { PaymentItem } from '../types/productType'

export const useCheckout = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const checkout = async (cart: PaymentItem[]) => {
        setLoading(true)
        setError(null)

        try {
            const { url } = await createCheckout(cart)
            return url
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Lo sentimos, tuvimos un problema al procesar el pago'
            setError(message)
            return null
        } finally {
            setLoading(false)
        }
    }

    return { checkout, loading, error }
}