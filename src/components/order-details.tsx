import { getAllOrders, type Order } from '@/api/get-all-orders'
import { statusMap } from '@/constants/status-map'
import { useEffect, useState } from 'react'

export default function OrderDetails() {
	const [order, setOrder] = useState<Order | null>(null)
	const params = new URLSearchParams(window.location.search)
	const pickupAddress = order?.destinations[0]?.address || ''
	const status = statusMap[order?.status ?? 1] || statusMap[1]

	// const dropoffAddress = order?.destinations[order?.destinations.length - 1]?.address || ''

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
		<div className="bg-bg conic-border mt-[20px] ml-[34px] flex w-full items-start justify-start rounded-[20px]">
			<div className="py-[24px] pl-[42px]">
				<div className="flex w-full items-center">
					<div className="bg-primary outline-primary mr-[20px] flex size-[32px] flex-grow items-center justify-center gap-2 rounded-full outline outline-offset-[4px]">
						<img src="/truck-black-stroke.svg" alt="Truck" className="h-[17.6px] w-[26.5px]" />
					</div>
					<div className="flex max-w-[215px] min-w-0 flex-grow flex-col gap-[2px] px-3">
						<span className="text-txt-tertiary text-[8px] font-semibold">PICKUP</span>
						<span className="text-txt text-[15.5px] font-semibold">{order.route.pickup}</span>
						<span className="text-reference w-full truncate text-[12.5px] font-medium">{pickupAddress}</span>
						<div className="flex h-[10px] items-center gap-2 text-[10px]">
							<span className={`${status.color} h-[10px] w-[10px] rounded-full`} />
							<span className={`text-txt h-[10px]`}>{status.label}</span>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="flex w-full items-center">
				<div className="flex size-20 flex-grow items-center gap-2">
					<img src="/location.svg" alt="Location" className="h-[17.6px] w-[26.5px]" />
				</div>
				<div className="flex min-w-0 flex-grow flex-col gap-[2px] px-3 max-w-[215px]">
					<span className="text-txt-tertiary text-[8px] font-semibold">DROPOFF</span>
					<span className="text-txt text-[15.5px] font-semibold">{order.route.dropoff}</span>
					<span className="text-reference w-full truncate text-[12.5px] font-medium">{dropoffAddress}</span>
				</div>
			</div> */}
		</div>
	)
}
