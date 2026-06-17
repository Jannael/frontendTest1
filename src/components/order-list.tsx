import type { Order } from '@/api/get-all-orders'
import OrderComponent from '@/components/order'
import { useOrdersStore } from '@/stores/orders'
import { useEffect } from 'react'

interface SearchOrdersProps {
	orders: Order[]
}

export default function OrdersList({ orders }: SearchOrdersProps) {
	const { filteredOrders } = useOrdersStore()
	const setAllOrders = useOrdersStore((state) => state.setAllOrders)

	useEffect(() => {
		setAllOrders(orders)
	}, [orders, setAllOrders])

	if (filteredOrders.length === 0) {
		return (
			<div className="px-4 py-8 text-center">
				<p className="text-txt-secondary">No orders found</p>
			</div>
		)
	}

	return (
		<ul className="mt-[40px] flex flex-col items-center gap-4 px-4">
			{filteredOrders.map((order) => (
				<OrderComponent order={order} key={order.id} />
			))}
		</ul>
	)
}
