const BASE_URL = "http://127.0.0.1:8080";

export async function apiClient<T>(path: string, options: RequestInit = {}): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
		credentials: "include",
		body: options.body ? options.body : undefined,
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || "Something went wrong");
	}

	return res.json();
}
