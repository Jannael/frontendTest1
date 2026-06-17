import { useState } from 'react'
import type { Order } from '@/api/get-all-orders'
import { useOrder } from '@/hooks/useOrder'
import { useActiveSectionStore } from '@/stores/active-section'

export default function OrderInfo({ orders }: { orders: Order[] }) {
	const { order } = useOrder({ orders })
	const activeSection = useActiveSectionStore((state) => state.activeSection)
	const [isOpen, setIsOpen] = useState(true)

	if (!order) return null

	const destination = activeSection === 'PICKUP' ? order.destinations[0] : order.destinations[order.destinations.length - 1]

	if (!destination) return null

	const title = activeSection === 'PICKUP' ? 'Pickup Data' : 'Dropoff Data'
	const date = destination.startDate
		? new Date(destination.startDate * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
		: ''
	const time = destination.startDate
		? new Date(destination.startDate * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
		: ''

	return (
		<section className="m-[34px] flex w-auto flex-col items-start justify-center rounded-[20px] p-[24px]">
			<button type="button" onClick={() => setIsOpen(!isOpen)} className="border-margin-gray flex w-full items-center justify-between border-b pb-4">
				<h2 className="text-txt text-[20px] font-extrabold">{title}</h2>
				<svg
					className={`text-primary h-4 w-4 transition-transform ${isOpen ? '' : 'rotate-180'}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
				</svg>
			</button>

			{isOpen && (
				<div className="mt-4 flex w-full flex-col gap-4">
					<p className="text-txt text-[16px] font-semibold">{destination.address}</p>

					{date && time && (
						<p className="text-txt text-[15px] font-medium">
							{date} • {time}
						</p>
					)}

					{destination.contactInfo.telephone && <p className="text-txt text-[15px] font-medium">{destination.contactInfo.telephone}</p>}

					{destination.contactInfo.email && <p className="text-txt text-[15px] font-medium">{destination.contactInfo.email}</p>}
				</div>
			)}
		</section>
	)
}
