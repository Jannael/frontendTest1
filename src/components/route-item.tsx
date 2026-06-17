import { formatDate } from '@/utils/format-date'
import { formatTime } from '@/utils/fromat-time'

interface RouteItemProps {
	label: 'PICKUP' | 'DROPOFF'
	icon: string
	iconAlt: string
	title: string
	address: string
	date: number
}

export default function RouteItem({ label, icon, iconAlt, title, address, date }: RouteItemProps) {
	return (
		<div className="flex w-full items-center">
			<div className="flex size-20 flex-grow items-center gap-2 lg:size-5">
				<img src={icon} alt={iconAlt} className="h-[17.6px] w-[26.5px]" />
			</div>
			<div className="flex min-w-0 flex-grow flex-col gap-[2px] px-3">
				<span className="text-txt-tertiary text-[8px] font-semibold">{label}</span>
				<span className="text-txt text-[15.5px] font-semibold">{title}</span>
				<span className="text-reference w-full truncate text-[12.5px] font-medium">{address}</span>
			</div>
			<div className="flex flex-grow flex-col justify-end gap-[2px] pl-10 text-right">
				<span className="text-txt-tertiary text-[10.5px] font-semibold">{formatDate(date)}</span>
				<span className="text-txt text-[12px] font-medium">{formatTime(date)}</span>
			</div>
		</div>
	)
}
