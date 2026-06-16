import { create } from 'zustand'
import type { Order } from '@/api/get-all-orders'

interface OrdersState {
	allOrders: Order[]
	searchQuery: string
	filteredOrders: Order[]
	setAllOrders: (orders: Order[]) => void
	setSearchQuery: (query: string) => void
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
	allOrders: [],
	searchQuery: '',
	filteredOrders: [],
	setAllOrders: (orders) => {
		const query = get().searchQuery.toLowerCase()
		const filtered = query ? orders.filter((order) => order.referenceNumber.toLowerCase().includes(query)) : orders
		set({ allOrders: orders, filteredOrders: filtered })
	},
	setSearchQuery: (query) => {
		const orders = get().allOrders
		const lowerQuery = query.toLowerCase()
		const filtered = lowerQuery ? orders.filter((order) => order.referenceNumber.toLowerCase().includes(lowerQuery)) : orders
		set({ searchQuery: query, filteredOrders: filtered })
	},
}))
