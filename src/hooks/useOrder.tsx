import type { Order } from '@/api/get-all-orders'
import { useMemo } from 'react'

export function useOrder({ orders }: { orders: Order[] }) {
	const orderId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('order') : null

	const order = useMemo(() => {
		if (!orderId || orders.length === 0) return null
		return orders.find((o) => o.id === orderId) || null
	}, [orderId, orders])

	return { order }
}
