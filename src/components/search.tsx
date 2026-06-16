import { useEffect } from 'react'
import { useOrdersStore } from '@/stores/orders'
import { SearchInput } from '@/components/search-input'
import { OrdersList } from '@/components/orders-list'
import type { Order } from '@/api/get-all-orders'

//NOTE: The filtered in the client
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
