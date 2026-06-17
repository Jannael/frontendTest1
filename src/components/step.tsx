export default function Step({
	label,
	isCompleted,
	totalSteps,
	stepIndex,
}: {
	label: string
	isCompleted: boolean
	totalSteps?: number
	stepIndex?: number
}) {
	return (
		<li className="relative flex items-center gap-4">
			{isCompleted ? (
				<span className="bg-primary flex size-[28px] items-center justify-center rounded-full">
					<img src="/check.svg" className="h-[6.6px] w-[10.1px]" />
				</span>
			) : (
				<span className="flex size-[28px] items-center justify-center rounded-full">
					<img src="/disabled-bullet.svg" className="size-full" />
				</span>
			)}
			<span className={`text-[15.4px] font-extrabold ${isCompleted ? 'text-txt' : 'text-txt-tertiary'}`}>{label}</span>

			{totalSteps !== undefined && stepIndex !== undefined && stepIndex !== 1 && (
				<div className={`absolute -top-[21px] left-[13px] h-[21px] w-[2px] bg-red-500 ${isCompleted ? 'bg-primary' : 'bg-txt-tertiary'}`}></div>
			)}
		</li>
	)
}
