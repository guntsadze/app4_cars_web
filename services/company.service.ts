import { api } from "@/libs/api";
import { BaseCrudService } from "./base.service";
import { COMPANY_ENDPOINT } from "@/libs/constants/endpoints";

class CompanyService extends BaseCrudService {
  constructor() {
    super(COMPANY_ENDPOINT);
  }

  async verifyCompany(id: string) {
    return await api.post(`${this.endpoint}/${id}/verify`);
  }
}

export const companyService = new CompanyService();
