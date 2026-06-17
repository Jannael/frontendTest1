import { describe, expect, it, mock, beforeEach, afterEach } from 'bun:test'

const mockFetch = mock()

const mockRawOrder = {
	status: 200,
	result: {
		_id: 'order-123',
		order_number: 'ORD-001',
		reference_number: 'REF-001',
		status: 3,
		completion_percentage: 50,
		route: {
			pickup: 'Pickup Location',
			dropoff: 'Dropoff Location',
			start_date: 1700000000,
			end_date: 1700003600,
			status: 1,
		},
		cargo: {
			type: 'FCL',
			description: 'Test cargo',
			weight_unit: 'kg',
		},
		driver: {
			_id: 'driver-123',
			nickname: 'John Doe',
			email: 'john@example.com',
			telephone: '+1234567890',
		},
		truck: {
			_id: 'truck-123',
			attributes: {
				plates: 'ABC-123',
				brand: 'Volvo',
				year: '2022',
			},
		},
		pricing: {
			subtotal: 1000,
			taxes: 100,
			total: 1100,
		},
		destinations: [
			{
				address: '123 Pickup St',
				lat: 40.7128,
				lng: -74.006,
				zip_code: 10001,
				contact_info: {
					name: 'Pickup Contact',
					telephone: '+1111111111',
					email: 'pickup@example.com',
				},
				status: 1,
				status_string: 'PENDING_PICKUP',
			},
		],
		status_list: {
			pickup: [{ active: true, status: 'pending' }],
			dropoff: [{ active: false, status: 'pending' }],
		},
		start_date: 1700000000,
		end_date: 1700003600,
	},
}

describe('getAllOrders', () => {
	beforeEach(() => {
		globalThis.fetch = mockFetch as unknown as typeof fetch
		mockFetch.mockReset()
	})

	afterEach(() => {
		mockFetch.mockRestore()
	})

	it('maps dest.status_string to destinations.statusString', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockRawOrder,
		} as Response)

		const { getAllOrders } = await import('@/api/get-all-orders')
		const orders = await getAllOrders()

		expect(orders[0].destinations[0].statusString).toBe('PENDING_PICKUP')
	})
})
