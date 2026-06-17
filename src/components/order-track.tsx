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
			<img src="/default-profile.png" />
		</section>
	)
}
