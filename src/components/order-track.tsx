import type { Order } from '@/api/get-all-orders'

interface OrderTrackProps {
	order: Order | null
}

export default function OrderTrack({ order }: OrderTrackProps) {
	if (!order) return null

	return (
		<section className="flex w-full flex-col items-center justify-center px-[38px]">
			{/* i am always using the default because images are blocked from AWS */}
			<img src="/default-profile.png" />
		</section>
	)
}
