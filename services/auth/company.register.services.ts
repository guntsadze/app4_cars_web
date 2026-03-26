import { api } from "@/lib/api";
import { COMPANY_REGISTER } from "@/lib/constants/endpoints";

class CompanyRegisterService {
  async register(data: any) {
    const response = await api.post(COMPANY_REGISTER, data);
    return response;
  }
}

export const companyRegisterService = new CompanyRegisterService();
