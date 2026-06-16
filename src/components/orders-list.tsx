import { useOrdersStore } from '@/stores/orders'

export function OrdersList() {
	const { filteredOrders } = useOrdersStore()

	if (filteredOrders.length === 0) {
		return (
			<div className="px-4 py-8 text-center">
				<p className="text-txt-secondary">No orders found</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-4 px-4 py-3">
			{filteredOrders.map((order) => (
				<div key={order.id} className="bg-bg-secondary rounded-lg p-4">
					<p className="text-txt font-avenir text-sm">Ref: {order.referenceNumber}</p>
				</div>
			))}
		</div>
	)
}
