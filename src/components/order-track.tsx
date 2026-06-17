import type { Order } from '@/api/get-all-orders'
import { useOrder } from '@/hooks/useOrder'
import Step from '@/components/step'

interface OrderTrackProps {
	orders: Order[]
}

const steps = [
	{ id: 1, label: 'Pending' },
	{ id: 2, label: 'Confirmed' },
	{ id: 3, label: 'In Transit' },
	{ id: 4, label: 'Delivered' },
]

export default function OrderTrack({ orders }: OrderTrackProps) {
	const { order } = useOrder({ orders })

	if (!order) return null

	const currentStep = order.status

	return (
		<section className="mb-[100px] flex w-full flex-col items-center justify-center px-[38px]">
			{/* i am always using the default because images are blocked from AWS */}
			<div className="conic-border bg-bg relative mt-[100px] flex w-full flex-col items-center justify-center rounded-[20px] pt-[70px]">
				<img src="/default-profile.png" className="absolute top-0 left-1/2 size-[90px] size-fit -translate-x-1/2 -translate-y-1/2 transform" />
				<span className="text-txt mb-[40px] text-[20px] font-extrabold">10:30 PM</span>

				<ol className="m-auto mb-[45px] ml-[45px] flex w-full flex-col items-start justify-center gap-[21px]">
					{steps.map((step, index) => {
						const isCompleted = step.id <= currentStep

						return <Step key={step.id} label={step.label} isCompleted={isCompleted} totalSteps={steps.length} stepIndex={index + 1} />
					})}
				</ol>

				<button className="text-bg bg-primary h-[75px] w-full rounded-b-[19px] text-[20px] font-extrabold">Track Order</button>
			</div>
		</section>
	)
}
