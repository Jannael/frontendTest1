export const statusMap: Record<number, { label: string; color: string }> = {
	1: { label: 'Pending', color: 'bg-txt-secondary' },
	2: { label: 'Confirmed', color: 'bg-accent' },
	3: { label: 'In Transit', color: 'bg-primary' },
	4: { label: 'Delivered', color: 'bg-green-500' },
	5: { label: 'Cancelled', color: 'bg-red-500' },
}
