export function formatDate(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleDateString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	})
}
