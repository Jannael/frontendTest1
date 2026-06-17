import { useState, useEffect, useCallback } from 'react'

interface OrderStatusProps {
	startDate: number
}

export default function OrderStatus({ startDate }: OrderStatusProps) {
	const [timeRemaining, setTimeRemaining] = useState(0)
	const [isEnabled, setIsEnabled] = useState(false)

	const calculateRemaining = useCallback(() => {
		return Math.max(0, startDate * 1000 - Date.now())
	}, [startDate])

	useEffect(() => {
		const interval = setInterval(() => {
			const remaining = calculateRemaining()
			setTimeRemaining(remaining)

			if (remaining <= 0) {
				setIsEnabled(true)
				clearInterval(interval)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [calculateRemaining])

	const formatCountdown = (ms: number): string => {
		if (ms <= 0) return '00:00:00:00:00'
		const years = Math.floor(ms / 31536000000)
		const days = Math.floor((ms % 31536000000) / 86400000)
		const hours = Math.floor((ms % 86400000) / 3600000)
		const minutes = Math.floor((ms % 3600000) / 60000)
		const seconds = Math.floor((ms % 60000) / 1000)
		return `${String(years).padStart(2, '0')}:${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
	}

	const handleClick = () => {
		console.log('navegar')
	}

	if (!isEnabled) {
		return (
			<div className="flex items-center justify-center gap-1">
				<span className="text-txt text-[12px] font-medium">Start pickup in</span>
				<span className="text-primary text-[12px] font-medium">{formatCountdown(timeRemaining)}</span>
			</div>
		)
	}

	return (
		<button
			onClick={handleClick}
			className="bg-primary h-full rounded-tr-[20px] rounded-br-[30px] rounded-bl-[19px] pr-[22px] pl-[50px] text-[13.3px] font-semibold"
		>
			Its time for pickup
		</button>
	)
}
