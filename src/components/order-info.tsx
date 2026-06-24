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
		<section className="m-[34px] flex w-auto flex-col items-start justify-center rounded-[20px]">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="conic-border flex h-[72px] w-full items-center justify-between rounded-[20px] px-[22px]"
			>
				<h2 className="text-txt font-inter text-[15.2px] font-semibold">{title}</h2>
				<img src="/drop-menu-icon.svg" className={`text-primary h-[14px] w-[9px] transition-transform ${isOpen ? '' : 'rotate-180'}`} />
			</button>

			{isOpen && (
				<div className="mt-4 flex w-full flex-col gap-4 px-4">
					<p className="text-txt text-[15.3px] font-extrabold">{destination.address}</p>

					{date && time && (
						<p className="text-txt text-[15px] font-extrabold">
							{date} • {time}
						</p>
					)}

					{destination.contactInfo.telephone && <p className="text-txt text-[16px] font-extrabold">{destination.contactInfo.telephone}</p>}

					{destination.contactInfo.email && <p className="text-txt text-[15px] font-extrabold">{destination.contactInfo.email}</p>}
				</div>
			)}
		</section>
	)
}
