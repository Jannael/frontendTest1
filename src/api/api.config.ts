const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL

// here i would manage the auth token and other common headers if needed in the future
// full implementation of this pattern at https://github.com/Jannael/Task-management-frontend/blob/main/src/service/api.config.ts

interface ApiParams {
	endpoint: string
	options?: RequestInit
	_retryCount?: number
}

// Retry logic (3 attempts)

export async function api<T>({ endpoint, options = {}, _retryCount = 0 }: ApiParams): Promise<T> {
	const maxRetries = 3

	const res = await fetch(`${BASE_URL}${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
		...options,
	})

	if (!res.ok) {
		if (_retryCount < maxRetries) {
			await new Promise((r) => setTimeout(r, 1000 * (_retryCount + 1)))
			return api<T>({ endpoint, options, _retryCount: _retryCount + 1 })
		}
		throw new Error(`API error: ${res.status} ${res.statusText}`)
	}

	return res.json() as Promise<T>
}
