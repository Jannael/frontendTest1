import { useEffect } from 'react'
import { useOrdersStore } from '@/stores/orders'
import { SearchInput } from '@/components/search-input'
import { OrdersList } from '@/components/orders-list'
import type { Order } from '@/api/get-all-orders'

// NOTE: The filtered in the client side, because the api doesn't support search query params, and we don't want to fetch all orders every time the user types something in the search input, so we fetch all orders once and then filter them in the client side, also i was told the backend stuff was not important.

interface SearchOrdersProps {
	orders: Order[]
}

export default function SearchOrders({ orders }: SearchOrdersProps) {
	const setAllOrders = useOrdersStore((state) => state.setAllOrders)

	useEffect(() => {
		setAllOrders(orders)
	}, [orders, setAllOrders])

	return (
		<div className="flex flex-col">
			<SearchInput />
			<OrdersList />
		</div>
	)
}
