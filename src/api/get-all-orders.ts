import { api } from './api.config'

export interface Order {
	id: string
	orderNumber: string
	referenceNumber: string
	status: number
	completionPercentage: number
	route: {
		pickup: string
		dropoff: string
		startDate: number
		endDate: number
		status: number
	}
	cargo: {
		type: string
		description: string
		weight: number[]
		weightUnit: string
	}
	driver: {
		id: string
		name: string
		email: string
		telephone: string
		thumbnail?: string
	} | null
	truck: {
		id: string
		plates: string
		brand: string
		year: string
		thumbnail?: string
	} | null
	pricing: {
		subtotal: number
		taxes: number
		total: number
	}
	destinations: Array<{
		address: string
		lat: number
		lng: number
		zipCode: number
		contactInfo: {
			name: string
			telephone: string
			email: string
		}
		startDate?: number
		endDate?: number
		status: number
		statusString: string
	}>
	statusList: {
		pickup: Array<{ active: boolean; status: string }>
		dropoff: Array<{ active: boolean; status: string }>
	}
	startDate: number
	endDate: number
}

interface ApiResponse {
	status: number
	result: RawOrder
}

interface RawOrder {
	_id: string
	order_number: string
	reference_number: string
	status: number
	completion_percentage: number
	route: {
		pickup: string
		dropoff: string
		start_date: number
		end_date: number
		status: number
	}
	cargo: {
		type: string
		description: string
		weigth?: number[]
		weight_unit: string
	}
	driver?: {
		_id: string
		nickname: string
		email: string
		telephone: string
		thumbnail?: string
	}
	truck?: {
		_id: string
		attributes: {
			plates: string
			brand: string
			year: string
		}
		thumbnail?: string
	}
	pricing: {
		subtotal: number
		taxes: number
		total: number
	}
	destinations: Array<{
		address: string
		lat: number
		lng: number
		zip_code: number
		contact_info: {
			name: string
			telephone: string
			email: string
		}
		startDate?: number
		endDate?: number
		status: number
		status_string: string
	}>
	status_list: {
		pickup: Array<{ active: boolean; status: string }>
		dropoff: Array<{ active: boolean; status: string }>
	}
	start_date: number
	end_date: number
}

function mapOrder(raw: RawOrder): Order {
	return {
		id: raw._id,
		orderNumber: raw.order_number,
		referenceNumber: raw.reference_number,
		status: raw.status,
		completionPercentage: raw.completion_percentage,
		route: {
			pickup: raw.route.pickup,
			dropoff: raw.route.dropoff,
			startDate: raw.route.start_date,
			endDate: raw.route.end_date,
			status: raw.route.status,
		},
		cargo: {
			type: raw.cargo.type,
			description: raw.cargo.description,
			weight: raw.cargo.weigth || [],
			weightUnit: raw.cargo.weight_unit,
		},
		driver: raw.driver
			? {
					id: raw.driver._id,
					name: raw.driver.nickname,
					email: raw.driver.email,
					telephone: raw.driver.telephone,
					thumbnail: raw.driver.thumbnail,
				}
			: null,
		truck: raw.truck
			? {
					id: raw.truck._id,
					plates: raw.truck.attributes.plates,
					brand: raw.truck.attributes.brand,
					year: raw.truck.attributes.year,
					thumbnail: raw.truck.thumbnail,
				}
			: null,
		pricing: {
			subtotal: raw.pricing.subtotal,
			taxes: raw.pricing.taxes,
			total: raw.pricing.total,
		},
		destinations: raw.destinations.map((dest) => ({
			address: dest.address,
			lat: dest.lat,
			lng: dest.lng,
			zipCode: dest.zip_code,
			contactInfo: {
				name: dest.contact_info.name,
				telephone: dest.contact_info.telephone,
				email: dest.contact_info.email,
			},
			startDate: dest.startDate,
			endDate: dest.endDate,
			status: dest.status,
			statusString: dest.status_string,
		})),
		statusList: {
			pickup: raw.status_list.pickup,
			dropoff: raw.status_list.dropoff,
		},
		startDate: raw.start_date,
		endDate: raw.end_date,
	}
}

export async function getAllOrders(): Promise<Order[]> {
	const response = await api<ApiResponse>({ endpoint: '/orders' })
	return [mapOrder(response.result)]
}
