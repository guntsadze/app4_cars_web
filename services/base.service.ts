import { api } from "@/lib/api";

export class BaseCrudService {
  constructor(protected endpoint: string) {}

  async getList(params?: any) {
    return await api.get(`${this.endpoint}/GetList`, params);
  }

  async getById(id: string) {
    const response = await api.get(`${this.endpoint}/Get?id=${id}`);
    return response;
  }

  async create(data: any) {
    const response = await api.post(`${this.endpoint}/Create`, data);
    return response;
  }

  async update(id: string, data: any) {
    const response = await api.put(`${this.endpoint}/Update?id=${id}`, data);
    return response;
  }

  async delete(id: string) {
    await api.delete(`${this.endpoint}/Delete?id=${id}`);
  }
}
