export function formatTime(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})
}
