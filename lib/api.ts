import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Api {
  private instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request Interceptor: ტოკენის ავტომატური ჩამატება ყველა მოთხოვნაში
    this.instance.interceptors.request.use((config) => {
      const token = this.getTokenFromCookie();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  private getTokenFromCookie(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match?.[2] || null;
  }

  // პარამეტრების გაფილტვრის დამხმარე მეთოდი
  private filterParams(params?: Record<string, any>) {
    if (!params) return undefined;
    return Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
    );
  }

  async get(path: string, query?: Record<string, any>, config?: AxiosRequestConfig) {
    const response = await this.instance.get(path, {
      ...config,
      params: this.filterParams(query), // აქ ხდება ავტომატური ფილტრაცია
    });
    return response.data;
  }

  async post(path: string, body?: any, config?: AxiosRequestConfig) {
    const response = await this.instance.post(path, body, config);
    return response.data;
  }

  async put(path: string, body?: any, config?: AxiosRequestConfig) {
    const response = await this.instance.put(path, body, config);
    return response.data;
  }

  async delete(path: string, config?: AxiosRequestConfig) {
    const response = await this.instance.delete(path, config);
    return response.data;
  }
}

export const api = new Api(process.env.NEXT_PUBLIC_API_URL + "/api");