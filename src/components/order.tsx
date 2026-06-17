import type { Order } from '@/api/get-all-orders'

const statusMap: Record<number, { label: string; color: string }> = {
	1: { label: 'Pending', color: 'bg-txt-secondary' },
	2: { label: 'Confirmed', color: 'bg-accent' },
	3: { label: 'In Transit', color: 'bg-primary' },
	4: { label: 'Delivered', color: 'bg-green-500' },
	5: { label: 'Cancelled', color: 'bg-red-500' },
}

export default function Order({ order }: { order: Order }) {
	const status = statusMap[order.status] || statusMap[1]

	return (
		<li key={order.id} className="bg-bg-secondary bg-bg rounded-lg p-4 px-[50px]">
			<header className="mb-[16px]">
				<span className="text-reference font-medium">Order</span>
				{order.orderNumber && <span className="font-inter text-txt ml-2 text-[17.3px] font-semibold">#{order.orderNumber}</span>}
			</header>
			<article className="conic-border bg-bg z-1 flex h-[290px] w-[350px] flex-col rounded-[20px]">
				<header className="bg-bg border-border-gray flex w-full items-center justify-between rounded-t-[20px] border-b px-[20px] py-[15px]">
					<div className="flex items-center gap-2">
						<img src="/FCL.svg" alt="FCL" className="h-[15px] w-[27px]" />
						<span className="text-txt text-[15.5px] font-extrabold">FCL</span>
					</div>
					<div className="flex items-center gap-2 text-[10px]">
						<span className={`${status.color} h-[10px] w-[10px] rounded-full`} />
						<span className={`text-txt`}>{status.label}</span>
					</div>
				</header>

				<div className="bg-bg flex-grow rounded-b-[20px]"></div>
			</article>
		</li>
	)
}
