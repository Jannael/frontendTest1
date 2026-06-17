import type { Order } from '@/api/get-all-orders'
import { useOrder } from '@/hooks/useOrder'

interface OrderTrackProps {
	orders: Order[]
}

export default function OrderTrack({ orders }: OrderTrackProps) {
	const { order } = useOrder({ orders })

	if (!order) return null

	return (
		<section className="flex w-full flex-col items-center justify-center px-[38px]">
			{/* i am always using the default because images are blocked from AWS */}
			<div className="conic-border bg-bg relative mt-[100px] flex w-full items-center justify-center rounded-[20px] pt-[70px]">
				<img src="/default-profile.png" className="absolute top-0 left-1/2 size-fit -translate-x-1/2 -translate-y-1/2 transform" />
				<span className="text-txt mb-[40px] text-[20px] font-extrabold">10:30 PM</span>
			</div>
		</section>
	)
}
