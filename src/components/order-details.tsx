import { getAllOrders, type Order } from '@/api/get-all-orders'
import { useEffect, useState } from 'react'

export default function OrderDetails() {
	const [order, setOrder] = useState<Order | null>(null)
	const params = new URLSearchParams(window.location.search)

	useEffect(() => {
		const fetchOrders = async () => {
			const orders = await getAllOrders()
			const orderId = params.get('order')
			const foundOrder = orders.find((o) => o.id === orderId)
			setOrder(foundOrder || null)
		}
		fetchOrders()
	})

	if (!order) {
		return (
			<div className="flex flex-col items-center justify-center p-8">
				<p className="text-txt-secondary">Loading...</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-4 p-4">
			<h2 className="text-txt text-2xl font-bold">Order #{order.orderNumber}</h2>
			<p className="text-txt-secondary">Reference: {order.referenceNumber}</p>
			<p className="text-txt-secondary">Status: {order.status}</p>
		</div>
	)
}
