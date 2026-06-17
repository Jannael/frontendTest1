import { statusMap } from '@/constants/status-map'
import type { Order } from '@/api/get-all-orders'
import { useOrder } from '@/hooks/useOrder'

interface OrderDetailsProps {
	orders: Order[]
}

export default function OrderDetails({ orders }: OrderDetailsProps) {
	const { order } = useOrder({ orders })

	const pickupAddress = order?.destinations[0]?.address || ''
	const status = statusMap[order?.status ?? 1] || statusMap[1]
	const dropoffAddress = order?.destinations[order?.destinations.length - 1]?.address || ''

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

	return (
		<div className="bg-bg conic-border mt-[20px] ml-[34px] flex w-full items-start justify-start rounded-[20px]">
			<div className="flex flex-col py-[24px] pl-[42px]">
				<header className="mb-[22px] flex flex-col">
					<span className="text-txt font-inter text-[13px] font-semibold"> Reference: #{order.referenceNumber}</span>
					<span className="text-txt font-inter text-[17.5px] font-semibold"> Order: #{order.orderNumber}</span>
				</header>

				<div className="relative flex flex-col items-center justify-center before:absolute before:left-4 before:h-1/5 before:w-[1px] before:bg-gradient-to-b before:from-[#D9D9D9] before:to-[#0F1315]">
					<div className="mb-[30px] flex w-full items-center">
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

					<div className="flex w-full items-center">
						<div className="mr-[20px] flex size-[32px] flex-grow items-center justify-center gap-2 rounded-full outline outline-offset-[4px]">
							<span className="border-margin-gray size-[26px] rounded-full border"></span>
						</div>
						<div className="flex max-w-[215px] min-w-0 flex-grow flex-col gap-[2px] px-3">
							<span className="text-txt-tertiary text-[8px] font-semibold">DROPOFF</span>
							<span className="text-txt text-[15.5px] font-semibold">{order.route.dropoff}</span>
							<span className="text-reference w-full truncate text-[12.5px] font-medium">{dropoffAddress}</span>
							<div className="flex h-[10px] items-center gap-2 text-[10px]">
								<span className={`${status.color} h-[10px] w-[10px] rounded-full`} />
								<span className={`text-txt h-[10px]`}>{status.label}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
