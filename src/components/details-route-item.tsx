import type { Order } from '@/api/get-all-orders'
import { statusMap } from '@/constants/status-map'
import { useActiveSectionStore, type ActiveSection } from '@/stores/active-section'

interface DetailsRouteItemProps {
	label: ActiveSection
	order: Order
	address: string
}

export default function DetailsRouteItem({ label, order, address }: DetailsRouteItemProps) {
	const activeSection = useActiveSectionStore((state) => state.activeSection)
	const setActiveSection = useActiveSectionStore((state) => state.setActiveSection)

	const status = statusMap[order.status] || statusMap[1]
	const title = label === 'PICKUP' ? order.route.pickup : order.route.dropoff
	const isActive = activeSection === label
	const isPickup = label === 'PICKUP'

	return (
		<button
			type="button"
			onClick={() => setActiveSection(label)}
			className={`${isPickup ? 'mb-[30px]' : ''} flex w-full items-center text-left ${isActive ? 'opacity-100' : 'opacity-50'}`}
		>
			{isPickup ? (
				<div className="bg-primary outline-primary mr-[20px] flex size-[32px] flex-grow items-center justify-center gap-2 rounded-full outline outline-offset-[4px]">
					<img src="/truck-black-stroke.svg" alt="Truck" className="h-[17.6px] w-[26.5px]" />
				</div>
			) : (
				<div className="mr-[20px] flex size-[32px] flex-grow items-center justify-center gap-2 rounded-full outline outline-offset-[4px]">
					<span className="border-margin-gray size-[26px] rounded-full border"></span>
				</div>
			)}
			<div className="flex max-w-[215px] min-w-0 flex-grow flex-col gap-[2px] px-3">
				<span className="text-txt-tertiary text-[8px] font-semibold">{label}</span>
				<span className="text-txt text-[15.5px] font-semibold">{title}</span>
				<span className="text-reference w-full truncate text-[12.5px] font-medium">{address}</span>
				<div className="flex h-[10px] items-center gap-2 text-[10px]">
					<span className={`${status.color} h-[10px] w-[10px] rounded-full`} />
					<span className="text-txt h-[10px]">{status.label}</span>
				</div>
			</div>
		</button>
	)
}
