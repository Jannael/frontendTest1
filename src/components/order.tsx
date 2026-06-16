import type { Order } from '@/api/get-all-orders'

export default function Order({ order }: { order: Order }) {
	return (
		<li key={order.id} className="bg-bg-secondary bg-bg rounded-lg p-4">
			<header className="mb-[16px]">
				<span className="text-reference font-medium">Order</span>
				{order.orderNumber && <span className="font-inter text-txt ml-2 text-[17.3px] font-semibold">#{order.orderNumber}</span>}
			</header>

			<p className="text-txt font-avenir text-sm">Ref: {order.referenceNumber}</p>
		</li>
	)
}
