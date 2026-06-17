import { api } from '@/api/api.config'

export interface NextOrder {
	id: string
	orderNumber: string
	status: number
	statusString: string
	type: string
	driverId: string
	driverThumbnail: string | null
	destinations: Array<{
		address: string
		startDate: number
		endDate: number
		nickname: string
		showNavigation: boolean
	}>
	startDate: number
	endDate: number
	isToday: boolean
}

interface ApiResponse {
	status: number
	result: RawNextOrder[]
}

interface RawNextOrder {
	_id: string
	status: number
	order_number: string
	driver: string
	type: string
	destinations: Array<{
		address: string
		start_date: number
		end_date: number
		nickname: string
		show_navigation: boolean
	}>
	start_date: number
	end_date: number
	is_today: boolean
	status_string: string
	driver_thumbnail: string | null
}

function mapNextOrder(raw: RawNextOrder): NextOrder {
	return {
		id: raw._id,
		orderNumber: raw.order_number,
		status: raw.status,
		statusString: raw.status_string,
		type: raw.type,
		driverId: raw.driver,
		driverThumbnail: raw.driver_thumbnail,
		destinations: raw.destinations.map((dest) => ({
			address: dest.address,
			startDate: dest.start_date,
			endDate: dest.end_date,
			nickname: dest.nickname,
			showNavigation: dest.show_navigation,
		})),
		startDate: raw.start_date,
		endDate: raw.end_date,
		isToday: raw.is_today,
	}
}

export async function getNextOrders(): Promise<NextOrder[]> {
	const response = await api<ApiResponse>({ endpoint: '/orders/upcoming' })
	return response.result.map(mapNextOrder)
}
