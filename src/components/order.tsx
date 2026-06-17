import type { Order } from '@/api/get-all-orders'
import OrderStatus from './order-status'

const statusMap: Record<number, { label: string; color: string }> = {
	1: { label: 'Pending', color: 'bg-txt-secondary' },
	2: { label: 'Confirmed', color: 'bg-accent' },
	3: { label: 'In Transit', color: 'bg-primary' },
	4: { label: 'Delivered', color: 'bg-green-500' },
	5: { label: 'Cancelled', color: 'bg-red-500' },
}

function formatDate(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleDateString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	})
}

function formatTime(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})
}

export default function Order({ order }: { order: Order }) {
	const status = statusMap[order.status] || statusMap[1]
	const pickupAddress = order.destinations[0]?.address || ''
	const dropoffAddress = order.destinations[order.destinations.length - 1]?.address || ''

	return (
		<li key={order.id} className="bg-bg-secondary bg-bg w-full rounded-lg p-4 px-[20px]">
			<header className="mb-[16px]">
				<span className="text-reference font-medium">Order</span>
				{order.orderNumber && <span className="font-inter text-txt ml-2 text-[17.3px] font-semibold">#{order.orderNumber}</span>}
			</header>

			<article className="conic-border bg-bg z-1 flex h-[290px] w-full flex-col rounded-[20px]">
				<header className="bg-bg border-border-gray flex w-full items-center justify-between rounded-t-[20px] border-b px-[20px] py-[15px]">
					<div className="flex items-center gap-2">
						<img src="/FCL.svg" alt="FCL" className="h-[15px] w-[26.5px]" />
						<span className="text-txt text-[15.5px] font-extrabold">FCL</span>
					</div>
					<div className="flex h-[10px] items-center gap-2 text-[10px]">
						<span className={`${status.color} h-[10px] w-[10px] rounded-full`} />
						<span className={`text-txt h-[10px]`}>{status.label}</span>
					</div>
				</header>

				<div className="bg-bg flex w-full flex-grow flex-col items-center justify-center p-4 px-[20px]">
					<div className="flex w-full items-center">
						<div className="flex size-20 flex-grow items-center gap-2">
							<img src="/truck-white-stroke.svg" alt="Truck" className="h-[17.6px] w-[26.5px]" />
						</div>
						<div className="flex min-w-0 flex-grow flex-col gap-[2px] px-3">
							<span className="text-txt-tertiary text-[8px] font-semibold">PICKUP</span>
							<span className="text-txt text-[15.5px] font-semibold">{order.route.pickup}</span>
							<span className="text-reference w-full truncate text-[12.5px] font-medium">{pickupAddress}</span>
						</div>
						<div className="flex flex-grow flex-col justify-end gap-[2px] pl-10 text-right">
							<span className="text-txt-tertiary text-[10.5px] font-semibold">{formatDate(order.route.startDate)}</span>
							<span className="text-txt text-[12px] font-medium">{formatTime(order.route.startDate)}</span>
						</div>
					</div>

					<div className="flex w-full items-center">
						<div className="flex size-20 flex-grow items-center gap-2">
							<img src="/location.svg" alt="Location" className="h-[17.6px] w-[26.5px]" />
						</div>
						<div className="flex min-w-0 flex-grow flex-col gap-[2px] px-3">
							<span className="text-txt-tertiary text-[8px] font-semibold">DROPOFF</span>
							<span className="text-txt text-[15.5px] font-semibold">{order.route.dropoff}</span>
							<span className="text-reference w-full truncate text-[12.5px] font-medium">{dropoffAddress}</span>
						</div>
						<div className="flex flex-grow flex-col justify-end gap-[2px] pl-10 text-right">
							<span className="text-txt-tertiary text-[10.5px] font-semibold">{formatDate(order.route.endDate)}</span>
							<span className="text-txt text-[12px] font-medium">{formatTime(order.route.endDate)}</span>
						</div>
					</div>
				</div>

				<footer className="bg-bg flex h-[45px] w-full items-center justify-between">
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
