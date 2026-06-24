import type { Order } from '@/api/get-all-orders'
import OrderStatus from '@/components/order-status'
import RouteItem from '@/components/route-item'
import { statusMap } from '@/constants/status-map'

export default function Order({ order }: { order: Order }) {
	const status = statusMap[order.status] || statusMap[1]
	const pickupAddress = order.destinations[0]?.address || ''
	const dropoffAddress = order.destinations[order.destinations.length - 1]?.address || ''

	return (
		<li key={order.id} className="bg-bg-secondary bg-bg w-full rounded-lg px-[20px]">
			<header className="mb-[16px]">
				<span className="text-reference font-medium">Order</span>
				{order.orderNumber && <span className="font-inter text-txt ml-2 text-[17.3px] font-semibold">#{order.orderNumber}</span>}
			</header>

			<article className="conic-border contrast-bg z-1 flex h-[290px] w-full flex-col rounded-[20px]">
				<header className="border-border-gray flex w-full items-center justify-between rounded-t-[20px] border-b px-[20px] py-[15px]">
					<div className="flex items-center gap-2">
						<img src="/FCL.svg" alt="FCL" className="h-[15px] w-[26.5px]" />
						<span className="text-txt text-[15.5px] font-extrabold">FCL</span>
					</div>
					<div className="flex h-[10px] items-center gap-2 text-[10px]">
						<span className={`${status.color} h-[10px] w-[10px] rounded-full`} />
						<span className={`text-txt h-[10px]`}>{status.label}</span>
					</div>
				</header>

				<div className="relative flex w-full flex-grow flex-col items-center justify-center p-4 px-[20px] before:absolute before:left-8 before:h-1/5 before:w-[1px] before:bg-gradient-to-b before:from-[#D9D9D9] before:to-[#0F1315]">
					<RouteItem
						label="PICKUP"
						icon="/truck-white-stroke.svg"
						iconAlt="Truck"
						title={order.route.pickup}
						address={pickupAddress}
						date={order.route.startDate}
					/>
					<RouteItem
						label="DROPOFF"
						icon="/location.svg"
						iconAlt="Location"
						title={order.route.dropoff}
						address={dropoffAddress}
						date={order.route.endDate}
					/>
				</div>

				<footer className="flex h-[45px] w-full items-center justify-between">
					{/* <OrderStatus startDate={order.startDate} /> the time that comes from the order says 10000 years that{s why i commented it, but it works fine it{s just that also i don{t have the exact styles to show the hour }}} */}
					<OrderStatus startDate={0} />
					<a
						href={`/details?order=${order.id}`}
						className="bg-primary flex h-full items-center gap-2 rounded-tl-[30px] rounded-br-[16px] rounded-bl-[30px] px-[20px]"
					>
						<span className="text-bg font-inter text-[12.2px] font-semibold">Resume</span>
						<img src="/eye.svg" alt="View" className="h-[16px] w-[21px]" />
					</a>
				</footer>
			</article>
		</li>
	)
}
