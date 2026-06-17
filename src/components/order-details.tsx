import type { Order } from '@/api/get-all-orders'
import { useOrder } from '@/hooks/useOrder'
import DetailsRouteItem from '@/components/details-route-item'

interface OrderDetailsProps {
	orders: Order[]
}

export default function OrderDetails({ orders }: OrderDetailsProps) {
	const { order } = useOrder({ orders })

	if (orders.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-8">
				<p className="text-txt-secondary">Loading...</p>
			</div>
		)
	}

	if (!order) {
		return (
			<div className="flex flex-col items-center justify-center p-8">
				<p className="text-txt-secondary">Order not found</p>
			</div>
		)
	}

	const pickupAddress = order.destinations[0]?.address || ''
	const dropoffAddress = order.destinations[order.destinations.length - 1]?.address || ''

	return (
		<div className="bg-bg conic-border mt-[20px] ml-[34px] flex w-full items-start justify-start rounded-[20px]">
			<div className="flex flex-col py-[24px] pl-[42px]">
				<header className="mb-[22px] flex flex-col">
					<span className="text-txt font-inter text-[13px] font-semibold"> Reference: #{order.referenceNumber}</span>
					<span className="text-txt font-inter text-[17.5px] font-semibold"> Order: #{order.orderNumber}</span>
				</header>

				<div className="relative flex flex-col items-center justify-center before:absolute before:left-4 before:h-1/5 before:w-[1px] before:bg-gradient-to-b before:from-[#D9D9D9] before:to-[#0F1315]">
					<DetailsRouteItem label="PICKUP" order={order} address={pickupAddress} />
					<DetailsRouteItem label="DROPOFF" order={order} address={dropoffAddress} />
				</div>
			</div>
		</div>
	)
}
