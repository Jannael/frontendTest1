import { describe, expect, it, mock, beforeEach, afterEach } from 'bun:test'

const mockFetch = mock()

const mockRawNextOrders = {
	status: 200,
	result: [
		{
			_id: 'next-order-123',
			order_number: 'NEXT-001',
			driver: 'driver-123',
			type: 'FCL',
			status: 1,
			destinations: [
				{
					address: '456 Next St',
					start_date: 1700100000,
					end_date: 1700103600,
					nickname: 'Next Driver',
					show_navigation: true,
				},
			],
			start_date: 1700100000,
			end_date: 1700103600,
			is_today: true,
			status_string: 'CONFIRMED_STATUS',
			driver_thumbnail: 'https://example.com/driver.png',
		},
	],
}

describe('getNextOrders', () => {
	beforeEach(() => {
		globalThis.fetch = mockFetch as unknown as typeof fetch
		mockFetch.mockReset()
	})

	afterEach(() => {
		mockFetch.mockRestore()
	})

	it('maps status_string to statusString', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockRawNextOrders,
		} as Response)

		const { getNextOrders } = await import('@/api/get-next-orders')
		const orders = await getNextOrders()

		expect(orders[0].statusString).toBe('CONFIRMED_STATUS')
	})

	it('maps dest.show_navigation to dest.showNavigation', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockRawNextOrders,
		} as Response)

		const { getNextOrders } = await import('@/api/get-next-orders')
		const orders = await getNextOrders()

		expect(orders[0].destinations[0].showNavigation).toBe(true)
	})
})
