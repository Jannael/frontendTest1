import { useOrdersStore } from '@/stores/orders'

export function SearchInput() {
	const { searchQuery, setSearchQuery } = useOrdersStore()

	return (
		<div className="px-4 py-3">
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search by reference number..."
				className="bg-bg-secondary border-txt-secondary text-txt placeholder:text-txt-secondary focus:border-accent w-full rounded-lg border px-4 py-2.5 focus:outline-none"
			/>
		</div>
	)
}
