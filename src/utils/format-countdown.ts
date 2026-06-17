export const formatCountdown = (ms: number): string => {
	if (ms <= 0) return '00:00:00:00:00'
	const years = Math.floor(ms / 31536000000)
	const days = Math.floor((ms % 31536000000) / 86400000)
	const hours = Math.floor((ms % 86400000) / 3600000)
	const minutes = Math.floor((ms % 3600000) / 60000)
	const seconds = Math.floor((ms % 60000) / 1000)
	return `${String(years).padStart(2, '0')}:${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
