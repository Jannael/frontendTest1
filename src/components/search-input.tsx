import { useOrdersStore } from '@/stores/orders'

// NOTE: The filtered in the client side, because the api doesn't support search query params, and we don't want to fetch all orders every time the user types something in the search input, so we fetch all orders once and then filter them in the client side, also i was told the backend stuff was not important.

export default function SearchInput() {
	const { searchQuery, setSearchQuery } = useOrdersStore()

	return (
		<div className="px-4 py-3">
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search..."
				className="bg-bg-secondary border-txt-secondary text-txt placeholder:text-txt-secondary focus:border-accent w-full rounded-lg border px-4 py-2.5 focus:outline-none"
			/>
		</div>
	)
}
