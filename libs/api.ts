export class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getTokenFromCookie(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match?.[2] || null;
  }

  private async request(
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any,
    query?: Record<string, string | number | boolean>,
    extraHeaders?: HeadersInit,
  ) {
    const url = new URL(path, this.baseUrl);

    if (query) {
      Object.entries(query).forEach(([key, value]) =>
        url.searchParams.append(key, String(value)),
      );
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...extraHeaders,
    };

    const clientToken = this.getTokenFromCookie();
    if (clientToken && !headers.hasOwnProperty("Authorization")) {
      (headers as any).Authorization = `Bearer ${clientToken}`;
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API Error: ${response.status} - ${text}`);
    }

    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  get(
    path: string,
    query?: Record<string, string | number | boolean>,
    options?: { headers?: HeadersInit },
  ) {
    return this.request(path, "GET", undefined, query, options?.headers);
  }

  post(path: string, body?: any, options?: { headers?: HeadersInit }) {
    return this.request(path, "POST", body, undefined, options?.headers);
  }

  put(path: string, body?: any, options?: { headers?: HeadersInit }) {
    return this.request(path, "PUT", body, undefined, options?.headers);
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Make a DELETE request to the API.
   * @param {string} path - The path of the API endpoint.
   * @param {object} [options] - Optional configuration object.
   * @param {HeadersInit} [options.headers] - Optional headers to be sent with the request.
   * @returns {Promise<any>} - Resolves to the JSON response of the API.
   */
  /*******  d068bf3e-8e8b-4511-a6de-6da0d56ff258  *******/
  delete(path: string, options?: { headers?: HeadersInit }) {
    return this.request(path, "DELETE", undefined, undefined, options?.headers);
  }
}

export const api = new Api(process.env.NEXT_PUBLIC_API_URL + "/api");
