import { useOrdersStore } from '@/stores/orders'

// NOTE: The filtered in the client side, because the api doesn't support search query params, and we don't want to fetch all orders every time the user types something in the search input, so we fetch all orders once and then filter them in the client side, also i was told the backend stuff was not important.

export default function SearchInput() {
	const { searchQuery, setSearchQuery } = useOrdersStore()

	return (
		<div className="mt-[40px] h-[50px] w-full px-[46px]">
			<div className="border-margin-bottom flex h-full items-center justify-between border-b-2">
				<img src="/Magnifier.svg" alt="Search" className="size-5" />
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search..."
					className="text-txt size-full pl-3 focus:outline-none"
				/>
			</div>
		</div>
	)
}
