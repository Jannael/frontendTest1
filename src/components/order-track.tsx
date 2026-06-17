import type { Order } from '@/api/get-all-orders'
import { useOrder } from '@/hooks/useOrder'
import { statusMap } from '@/constants/status-map'

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
		<section className="flex w-full flex-col items-center justify-center px-[38px]">
			{/* i am always using the default because images are blocked from AWS */}
			<div className="conic-border bg-bg relative mt-[100px] flex w-full items-center justify-center rounded-[20px] pt-[70px]">
				<img src="/default-profile.png" className="absolute top-0 left-1/2 size-fit -translate-x-1/2 -translate-y-1/2 transform" />
				<span className="text-txt mb-[40px] text-[20px] font-extrabold">10:30 PM</span>
			</div>

			<div className="mt-8 w-full">
				{steps.map((step) => {
					const isCompleted = step.id < currentStep
					const isCurrent = step.id === currentStep
					const isCancelled = currentStep === 5

					return (
						<div key={step.id} className="flex items-start gap-4">
							<div className="flex flex-col items-center">
								<div
									className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
										isCompleted || isCurrent
											? statusMap[step.id]?.color || 'bg-primary'
											: isCancelled
												? 'bg-red-500'
												: 'border-txt-secondary bg-transparent'
									}`}
								>
									{isCompleted && (
										<svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
										</svg>
									)}
								</div>
								{step.id < steps.length && (
									<div className={`mt-1 h-16 w-1 ${isCompleted ? statusMap[step.id]?.color || 'bg-primary' : 'bg-txt-secondary'}`} />
								)}
							</div>
							<div className="flex-1 pt-2">
								<p className={`text-sm font-medium ${isCompleted || isCurrent ? 'text-txt' : 'text-txt-secondary'}`}>{step.label}</p>
							</div>
						</div>
					)
				})}

				{currentStep === 5 && (
					<div className="mt-4 flex items-start gap-4">
						<div className="flex flex-col items-center">
							<div className="flex h-6 w-6 items-center justify-center rounded-full border-2 bg-red-500">
								<svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</div>
						</div>
						<div className="flex-1 pt-2">
							<p className="text-sm font-medium text-red-500">Cancelled</p>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
